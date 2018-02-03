//
// Created by floris on 3/29/17.
//

#include "FunctionController.h"

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"


void declareParametersFor(std::vector<ParameterDeclaration*>& declarations);
void CacheRegistersFor(FunctionDefinition* function);
void RestoreRegistersFrom(FunctionDefinition* function);

FunctionController& FunctionController::Instance() {
    if (instance_ == nullptr) instance_ = new FunctionController();
    return *instance_;
}

void FunctionController::SetReturnTypeAs(Type& type) {
    currentFunction_->SetReturnTypeAs(type);
}

void FunctionController::Declare() {
    auto existing = getFunctionFor(currentFunction_->GetFunctionName());
    if (existing != nullptr) throw;
    currentFunction_->SetIsForward();
    functions_.push_back(currentFunction_);
}

void FunctionController::Start() {
    auto existing = getFunctionFor(currentFunction_->GetFunctionName());
    if (existing == nullptr) functions_.push_back(currentFunction_);
    else if (existing->IsForward()) existing->ClearIsForward();
    else throw;
    SymbolTable::Instance().EnterLocalScope();
    declareParametersFor(currentFunction_->GetDeclarations());
    currentFunction_->IncrementStackSizeBy(Parameter::GetCurrentOffset());
    Encoder::Instance().Start(currentFunction_);
}

void declareParametersFor(std::vector<ParameterDeclaration*>& declarations) {
    for (auto declaration : declarations) {
        auto identifierList = declaration->GetIdentifiers();
        for (auto identifier : identifierList.Identifiers) {
            auto variable = new Parameter(identifierList.TheType, declaration->IsReference());
            SymbolTable::Instance().Add(identifier, variable);
        }
    }
}

void FunctionController::CreatePrologue() {
    if (currentFunction_->IsForward()) return;
    Encoder::Instance().StartPrologueFor(currentFunction_);
    Encoder::Instance().IncrementStackPointerBy(-currentFunction_->GetStackSize());
    CacheRegistersFor(currentFunction_);
    Encoder::Instance().EndPrologueFor(currentFunction_);
    ExpressionInRegister::ClearRegistersUsed();
    Variable::ClearFrame();
    Parameter::ClearOffset();
    SymbolTable::Instance().ExitLocalScope();
    currentFunction_ = nullptr;
}

void CacheRegistersFor(FunctionDefinition* function) {
    for (auto i = 0u; i < 5; ++i) {
        Encoder::Instance().SaveRegisterToStack(i, i << 2);
    }
}

void FunctionController::CreateEpilogue() {
    if (currentFunction_->IsForward()) return;
    currentFunction_->SetRegistersUsed(ExpressionInRegister::GetRegistersUsed());
    Encoder::Instance().StartEpilogueFor(currentFunction_);
    RestoreRegistersFrom(currentFunction_);
    Encoder::Instance().IncrementStackPointerBy(currentFunction_->GetStackSize());
}

void RestoreRegistersFrom(FunctionDefinition* function) {
    for (auto i = 0u; i < 5; ++i) {
        Encoder::Instance().RestoreRegisterFromStack(i, i << 2);
    }
}

void FunctionController::Return(IExpression* returnValue) {
    if (returnValue->GetType() == Type::STRING) throw;
    Encoder::Instance().Return(*returnValue, currentFunction_);
    delete returnValue;
}

void FunctionController::Return() {
    Encoder::Instance().ReturnFrom(currentFunction_);
}

ExpressionInRegister* FunctionController::CallFunction(std::string* functionName, std::vector<IParameter*>* parameters) {
    auto function = getFunctionFor(*functionName);
    if (function == nullptr) throw;
    call(*function, *parameters);
    auto returnRegister = new ExpressionInRegister(function->GetReturnType());
    Encoder::Instance().LoadReturnValueInto(*returnRegister);
    return returnRegister;
}

void FunctionController::CallProcedure(std::string* functionName, std::vector<IParameter*>* parameters) {
    auto function = getFunctionFor(*functionName);
    if (function == nullptr) throw;
    call(*function, *parameters);
}

void FunctionController::call(FunctionDefinition& function, std::vector<IParameter*>& parameters) {
    auto functionName = function.GetFunctionName();
    auto neededParameters = function.GetDeclarations();
    auto frameOffset = function.GetParameterSize();
    load(neededParameters, parameters, frameOffset);
    Encoder::Instance().MoveFramePointerBy(-frameOffset);
    Encoder::Instance().Call(functionName);
    if (currentFunction_ != nullptr) {
        auto offset = currentFunction_->GetStackSize() - currentFunction_->GetParameterSize();
        Encoder::Instance().MoveFramePointerBy(offset);
    }
}

void FunctionController::load(std::vector<ParameterDeclaration*> neededParameters, std::vector<IParameter*> parameters,
                              unsigned int paramSize) {
    auto paramIndex = 0u;
    for (auto neededParameter : neededParameters) {
        for (auto id : neededParameter->GetIdentifiers().Identifiers) {
            if (neededParameter->GetType() != parameters[paramIndex]->GetType()) throw;
            auto destoffset = paramIndex * parameters[paramIndex]->GetSize() - paramSize;
            if (parameters[paramIndex]->IsVariable())
                copyVariable(neededParameter, (Variable*) parameters[paramIndex], destoffset);
            else // TODO: This could be a returned user type
                copyExpression(neededParameter, (IExpression*) parameters[paramIndex], destoffset);
            paramIndex++;
        }
    }
}

void FunctionController::copyVariable(ParameterDeclaration* neededParameter, Variable* providedParam, unsigned int destoffset) {
    if (neededParameter->IsReference())
        Encoder::Instance().CopyAddress(*providedParam, destoffset);
    else
        Encoder::Instance().CopyValue(*providedParam, destoffset);
}

void FunctionController::copyExpression(ParameterDeclaration* neededParameter, IExpression* providedParam, unsigned int destoffset) {
    if (neededParameter->IsReference()) throw;
    if (providedParam->IsConstant())
        providedParam = Encoder::Instance().LoadImmediate(((Literal*)providedParam));
    Encoder::Instance().CopyExpression(*((ExpressionInRegister*)providedParam), destoffset);
    delete providedParam;
}

FunctionDefinition* FunctionController::getFunctionFor(std::string& functionName) {
    for (auto function : functions_) {
        if (function->GetFunctionName() == functionName) return function;
    }
    return nullptr;
}


FunctionController* FunctionController::instance_ = nullptr;

#pragma clang diagnostic pop