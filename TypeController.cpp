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
    if (currentFunction_ != nullptr) {
        auto& type = currentFunction_->GetTypeFor( *typeName );
        if (&type != nullptr) return type;
    }
    return *(globalTypes_[*typeName]);
}

ArrayType* TypeController::CreateArrayTypeFrom(IExpression* lowerIndex, IExpression* upperIndex, Type& type) {
    if (!upperIndex->IsConstant()) throw;
    if (upperIndex->GetType() != Type::NUMERIC) throw;
    if (!lowerIndex->IsConstant()) throw;
    if (lowerIndex->GetType() != Type::NUMERIC) throw;
    auto upper = (NumericLiteral&)*(upperIndex);
    auto lower = (NumericLiteral&)*(lowerIndex);
    if (lower.GetValue() < 0) throw;
    if (upper.GetValue() < lower.GetValue()) throw;
    return new ArrayType((unsigned)lower.GetValue(), (unsigned)upper.GetValue(), type);
}

RecordType* TypeController::CreateRecordTypeFrom(std::vector<IdentifierList*>& identifierList) {
    return new RecordType(identifierList);
}

void TypeController::Add(std::string* typeName, Type& type) {
    if (currentFunction_ == nullptr)
        globalTypes_[*typeName] = &type;
    else
        currentFunction_->Add( *typeName, type );
}

Variable& TypeController::GetFieldFor(Variable& variable, std::string* typeName) {
    auto& type = variable.GetType();
    if (type.GetType() != RECORD) throw;
    auto field = ((RecordType&)type).GetFieldFor(*typeName);
    auto offset = variable.GetOffset() + field.Offset;
    auto pointerType = variable.GetPointerType();
    return *(new Variable(field.TheType, pointerType, offset));
}

Variable& TypeController::GetIndexFor(Variable& variable, IExpression* index) {
    if (index->GetType() != Type::NUMERIC) throw;
    if (variable. IsConstant())
        return getVariableFor(variable, (NumericLiteral&)*index);
    else {
        auto& reg = (ExpressionInRegister&)*index;
        auto field = ((ArrayType&)variable.GetType()).GetField();
        auto regNumber = 5u;//variable.GetPointerType() == Register ? variable.GetRegisterNumber() ? (new ExpressionInRegister(Type::NUMERIC))->GetAddress();
        auto newVariable = new Variable(field.TheType, 0, regNumber, false);
        Encoder::Instance().MoveAddressToRegister(*newVariable, variable, reg);
        delete index;
        return *newVariable;
    }
}

Variable& TypeController::getVariableFor(Variable& variable, NumericLiteral& numericLiteral) const {
    auto actualIndex = numericLiteral.GetValue();
    auto& type = variable.GetType();
    if (type.GetType() != ARRAY) throw;
    auto field = ((ArrayType&) type).GetField();
    auto offset = (actualIndex - field.Offset) * field.TheType.GetSize();
    auto pointerType = variable.GetPointerType();
    return *(new Variable(field.TheType, pointerType, offset));
}

TypeController* TypeController::instance_ = nullptr;

Variable& TypeController::GetVariableFor(std::string* typeName) {
    auto variable = SymbolTable::Instance().GetFor(typeName);
    if (variable->IsConstant()) throw;
    return *(Variable*)variable;
}

#pragma clang diagnostic pop