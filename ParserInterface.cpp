//
// Created by floris on 2/20/17.
//

#include <iostream>
#include "ParserInterface.h"
#include "SymbolTable.h"

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
ParserInterface& ParserInterface::Instance() {
    if (instance_ == nullptr) instance_ = new ParserInterface();
    return *instance_;
}

void ParserInterface::AddVariables(std::vector<IdentifierList*>* identifiersByType) {
    for (auto idList : *identifiersByType) {
        auto typeName = idList->TypeName;
        for (auto id : *(idList->Identifiers)) {
            auto variable = new Variable(typeName, PointerType::Global);
            SymbolTable::Instance().Add(id, variable);
        }
    }
}

void ParserInterface::StartProgram() {
}

void ParserInterface::EndProgram() {
    Encoder::Instance().EndProgram();
}

void ParserInterface::StartBlock() {
    SymbolTable::Instance().EnterLocalScope();
}

void ParserInterface::EndBlock() {
    SymbolTable::Instance().ExitLocalScope();
}

Symbol* ParserInterface::GetSymbolFor(std::string* identifier) {
    return SymbolTable::Instance().GetFor(identifier);
}

IExpression* ParserInterface::GetExpressionFrom(Symbol* symbol) {
    if (symbol->IsConstant()) return Encoder::Instance().LoadImmediate(((Constant*)symbol)->GetLiteral());
    return Encoder::Instance().LoadFrom((Variable*)symbol);
}

ParserInterface* ParserInterface::instance_ = nullptr;

IExpression* ParserInterface::GetSuccessorFor(IExpression* expression) {
    return expression->GetSuccessor();
}

IExpression* ParserInterface::GetPredecessorFor(IExpression* expression) {
    return expression->GetPredecessor();
}

IExpression* ParserInterface::CastToOrdinal(IExpression* expression) {
    return expression->CastToOrdinal();
}

IExpression* ParserInterface::CastToCharacter(IExpression* expression) {
    return expression->CastToCharacter();
}

IExpression* ParserInterface::Negate(IExpression* expression) {
    return expression->Negate();
}

IExpression* ParserInterface::Not(IExpression* expression) {
    return expression->Not();
}

IExpression* ParserInterface::Modulo(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return moduloImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().Modulo(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::moduloImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) % getIntFrom(right);
    delete left;
    delete right;
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Divide(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return divideImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().Divide(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::divideImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) / getIntFrom(right);
    delete left;
    delete right;
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Multiply(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) {
        throw;
    }
    if (areConstant(left, right)) return multiplyImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().Multiply(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::multiplyImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) * getIntFrom(right);
    delete left;
    delete right;
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Subtract(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return subtractImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().Subtract(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::subtractImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) - getIntFrom(right);
    delete left;
    delete right;
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Add(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return addImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().Add(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::addImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) + getIntFrom(right);
    delete left;
    delete right;
    return new NumericLiteral(value);
}

IExpression* ParserInterface::CompareGreaterOrEqual(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return compareGreaterEqualImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().CompareGreaterOrEqual(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::compareGreaterEqualImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) >= getIntFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) >= getCharFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        }
        case BOOLEAN: {
            auto value = getBoolFrom(left) >= getBoolFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        default: {
            delete left;
            delete right;
            throw;
        }
    }
}

IExpression* ParserInterface::CompareGreater(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return compareGreaterImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().CompareGreater(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::compareGreaterImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) > getIntFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) > getCharFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        }
        case BOOLEAN: {
            auto value = getBoolFrom(left) > getBoolFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        default: {
            delete left;
            delete right;
            throw;
        }
    }
}

IExpression* ParserInterface::CompareNotEqual(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return compareNotEqualImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().CompareNotEqual(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::compareNotEqualImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) != getIntFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) != getCharFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        }
        case BOOLEAN: {
            auto value = getBoolFrom(left) != getBoolFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        default: {
            delete left;
            delete right;
            throw;
        }
    }
}

IExpression* ParserInterface::CompareEqual(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) {
        delete left;
        delete right;
        throw;
    }
    if (areConstant(left, right)) return compareEqualImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().CompareEqual(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::compareEqualImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) == getIntFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) == getCharFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        }
        case BOOLEAN: {
            auto value = getBoolFrom(left) == getBoolFrom(right);
            delete left;
            delete right;
            return new BooleanLiteral(value);
        };
        default: {
            delete left;
            delete right;
            throw;
        }
    }
}

bool ParserInterface::areNumeric(IExpression* left, IExpression* right) const {
    return left->GetType() == ExpressionType::NUMERIC and right->GetType() == ExpressionType::NUMERIC;
}

int ParserInterface::getIntFrom(const IExpression* expr) const {
    return ((NumericLiteral*)expr)->GetValue();
}

bool ParserInterface::areSameType(IExpression* left, IExpression* right) {
    return left->GetType() == right->GetType();
}

char ParserInterface::getCharFrom(IExpression* expr) {
    return ((CharacterLiteral*)expr)->GetValue();
}

IExpression* ParserInterface::And(IExpression* left, IExpression* right) {
    if(!areBoolean(left, right)) throw;
    if (areConstant(left, right)) return andImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().And(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::andImmediate(IExpression* left, IExpression* right) {
    auto value = getBoolFrom(left) && getBoolFrom(right);
    delete left;
    delete right;
    return new BooleanLiteral(value);
}

IExpression* ParserInterface::Or(IExpression* left, IExpression* right) {
    if (!areBoolean(left, right)) throw;
    if (areConstant(left, right)) return orImmediate(left, right);
    auto l = getRegisterFor(left);
    auto r = getRegisterFor(right);
    auto result = Encoder::Instance().Or(*l, *r);
    delete l;
    delete r;
    return result;
}

IExpression* ParserInterface::orImmediate(IExpression* left, IExpression* right) {
    auto value = getBoolFrom(left) || getBoolFrom(right);
    delete left;
    delete right;
    return new BooleanLiteral(value);
}

bool ParserInterface::areBoolean(IExpression* left, IExpression* right) {
    return left->GetType() == ExpressionType::BOOLEAN && right->GetType() == ExpressionType::BOOLEAN;
}

bool ParserInterface::areConstant(IExpression* left, IExpression* right) const {
    return left->IsConstant() and right->IsConstant();
}

bool ParserInterface::getBoolFrom(IExpression* expr) {
    return ((BooleanLiteral*)expr)->GetValue();
}

void ParserInterface::Assign(Symbol* variable, IExpression* rvalue) {
    if (variable->IsConstant()) throw;
    auto reg = getRegisterFor(rvalue);
    Encoder::Instance().Assign(*((Variable*)variable), reg);
    delete reg;
}

ExpressionInRegister* ParserInterface::getRegisterFor(IExpression* expr) {
    if (!expr->IsConstant()) return (ExpressionInRegister*)expr;
    auto result = Encoder::Instance().LoadImmediate((Literal*)expr);
    delete expr;
    return result;
}

void ParserInterface::Write(std::vector<IExpression*>* expressions) {
    for (auto expr : *expressions) {
        Encoder::Instance().Write(expr);
    }
    delete expressions;
}

void ParserInterface::Read(std::vector<Symbol*>* symbols) {
    for(auto symbol : *symbols) {
        auto variable = (Variable*)symbol;
        auto result = Encoder::Instance().Read(variable->GetType());
        Assign(symbol, result);
    }
}

#pragma clang diagnostic pop