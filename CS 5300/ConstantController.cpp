//
// Created by floris on 4/3/17.
//

#include "ConstantController.h"
#include "SymbolTable.h"

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
ConstantController& ConstantController::Instance() {
    if (instance_ == nullptr) instance_ = new ConstantController();
    return *instance_;
}

ConstantController* ConstantController::instance_ = nullptr;

void ConstantController::Add(std::string* identifier, IExpression* expression) {
    if (!expression->IsConstant()) throw;
    auto constant = new Constant((Literal*)expression);
    SymbolTable::Instance().Add(identifier, constant);
}

#pragma clang diagnostic pop