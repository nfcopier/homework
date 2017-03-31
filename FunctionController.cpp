//
// Created by floris on 3/29/17.
//

#include "FunctionController.h"
#include "Encoder.h"
#include "Constant.h"

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"

void CacheRegistersFor(FunctionDefinition* function);
void RestoreRegistersFrom(FunctionDefinition* function);

FunctionController& FunctionController::Instance() {
    if (instance_ == nullptr) instance_ = new FunctionController();
    return *instance_;
}

void FunctionController::Start(FunctionDefinition* function) {
    Encoder::Instance().Start(function);
}

void FunctionController::CreatePrologueFor(FunctionDefinition* function) {
    Encoder::Instance().StartPrologueFor(function);
    Encoder::Instance().IncrementStackPointerBy(-function->GetStackSize());
    CacheRegistersFor(function);
    Encoder::Instance().EndPrologueFor(function);
}

void CacheRegistersFor(FunctionDefinition* function) {
    for (auto i = 0u; i < function->GetRegistersUsed(); ++i) {
        Encoder::Instance().SaveRegisterToStack(i, i << 2);
    }
}

void FunctionController::CreateEpilogueFor(FunctionDefinition* function) {
    function->IncrementStackSizeBy(ExpressionInRegister::GetRegistersUsed() << 2);
    function->SetRegistersUsed(ExpressionInRegister::GetRegistersUsed());
    ExpressionInRegister::ClearRegistersUsed();
    RestoreRegistersFrom(function);
    Encoder::Instance().IncrementStackPointerBy(function->GetStackSize());
}

void RestoreRegistersFrom(FunctionDefinition* function) {
    for (auto i = 0u; i < function->GetRegistersUsed(); ++i) {
        Encoder::Instance().RestoreRegisterFromStack(i, i << 2);
    }
}

ExpressionInRegister* FunctionController::CallFunction(std::string* functionName, std::vector<IParameter*>* parameters) {
    return new ExpressionInRegister(NUMERIC);
}

void FunctionController::CallProcedure(std::string* functionName, std::vector<IParameter*>* parameters) {

}


FunctionController* FunctionController::instance_ = nullptr;

#pragma clang diagnostic pop