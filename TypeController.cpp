//
// Created by floris on 4/12/17.
//

#include "TypeController.h"

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
TypeController::TypeController() {
    globalTypes_["integer"] = &Type::NUMERIC;
    globalTypes_["INTEGER"] = &Type::NUMERIC;
    globalTypes_["char"] = &Type::CHARACTER;
    globalTypes_["CHAR"] = &Type::CHARACTER;
    globalTypes_["boolean"] = &Type::BOOLEAN;
    globalTypes_["BOOLEAN"] = &Type::BOOLEAN;
    currentFunction_ = nullptr;
}

TypeController& TypeController::Instance() {
    if (instance_ == nullptr) instance_ = new TypeController();
    return *instance_;
}

Type& TypeController::GetTypeFrom(std::string* typeName) {
    return *(globalTypes_[*typeName]);
}

ArrayType* TypeController::CreateArrayTypeFrom(IExpression* lowerIndex, IExpression* upperIndex, Type& type) {
    if (!upperIndex->IsConstant()) throw;
    if (upperIndex->GetType() != Type::NUMERIC) throw;
    if (!lowerIndex->IsConstant()) throw;
    if (lowerIndex->GetType() != Type::NUMERIC) throw;
    auto upper = (NumericLiteral&)*(lowerIndex);
    auto lower = (NumericLiteral&)*(lowerIndex);
    return new ArrayType(lower.GetValue(), upper.GetValue(), type);
}

RecordType* TypeController::CreateRecordTypeFrom(std::vector<IdentifierList*>& identifierList) {
    return new RecordType(identifierList);
}

void TypeController::Add(std::string* typeName, Type& type) {
}

TypeController* TypeController::instance_ = nullptr;

#pragma clang diagnostic pop