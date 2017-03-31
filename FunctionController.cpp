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

ExpressionType getTypeFrom(std::string* typeName) {
    if (*typeName == "integer" or *typeName == "INTEGER") {
        return NUMERIC ;
    } else if (*typeName == "char" or *typeName == "CHAR") {
        return CHARACTER;
    } else if (*typeName == "boolean" or *typeName == "BOOLEAN") {
        return BOOLEAN;
    } else throw;
}

void FunctionController::SetReturnTypeAs(std::string* typeName) {
    auto type = getTypeFrom(typeName);
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
        auto type = getTypeFrom(identifierList.TypeName);
        for (auto identifier : identifierList.Identifiers) {
            auto variable = new Parameter(type, declaration->IsReference());
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
    SymbolTable::Instance().ExitLocalScope();
}

void CacheRegistersFor(FunctionDefinition* function) {
    for (auto i = 0u; i < function->GetRegistersUsed(); ++i) {
        Encoder::Instance().SaveRegisterToStack(i, i << 2);
    }
}

void FunctionController::CreateEpilogue() {
    if (currentFunction_->IsForward()) return;
    currentFunction_->IncrementStackSizeBy(ExpressionInRegister::GetRegistersUsed() << 2);
    currentFunction_->SetRegistersUsed(ExpressionInRegister::GetRegistersUsed());
    ExpressionInRegister::ClearRegistersUsed();
    Variable::ClearFrame();
    Parameter::ClearOffset();
    Encoder::Instance().StartEpilogueFor(currentFunction_);
    RestoreRegistersFrom(currentFunction_);
    Encoder::Instance().IncrementStackPointerBy(currentFunction_->GetStackSize());
}

void RestoreRegistersFrom(FunctionDefinition* function) {
    for (auto i = 0u; i < function->GetRegistersUsed(); ++i) {
        Encoder::Instance().RestoreRegisterFromStack(i, i << 2);
    }
}

ExpressionInRegister* FunctionController::CallFunction(std::string* functionName, std::vector<IParameter*>* parameters) {
    auto function = getFunctionFor(*functionName);
    return new ExpressionInRegister(function->GetReturnType());
}

void FunctionController::CallProcedure(std::string* functionName, std::vector<IParameter*>* parameters) {

}

FunctionDefinition* FunctionController::getFunctionFor(std::string& functionName) {
    for (auto function : functions_) {
        if (function->GetFunctionName() == functionName) return function;
    }
    return nullptr;
}

void FunctionController::Return(IExpression* expression) {
    Encoder::Instance().Return(*expression, currentFunction_);
    delete expression;
}

void FunctionController::Return() {
    Encoder::Instance().Return(currentFunction_);
}


FunctionController* FunctionController::instance_ = nullptr;

#pragma clang diagnostic pop