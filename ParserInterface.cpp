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
        for (auto id : idList->Identifiers) {
            SymbolTable::Instance().Add(typeName, *id);
        }
    }
}

void ParserInterface::StartProgram() {
}

void ParserInterface::EndProgram() {
    std::cout << "." << std::endl;
}

void ParserInterface::StartBlock() {
    std::cout << "BEGIN" << std::endl;
}

void ParserInterface::EndBlock() {
    std::cout << "END" << std::endl;
}

IExpression* ParserInterface::GetExpressionFrom(char* identifier) {
    return SymbolTable::Instance().GetFor(identifier);
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
    if (!areNumeric(left, right)) throw;
    if (areConstant(left, right)) return moduloImmediate(left, right);
    return left;
}

IExpression* ParserInterface::moduloImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) % getIntFrom(right);
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Divide(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) throw;
    if (areConstant(left, right)) return divideImmediate(left, right);
    return left;
}

IExpression* ParserInterface::divideImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) / getIntFrom(right);
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Multiply(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) throw;
    if (areConstant(left, right)) return multiplyImmediate(left, right);
    return left;
}

IExpression* ParserInterface::multiplyImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) * getIntFrom(right);
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Subtract(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) throw;
    if (areConstant(left, right)) return subtractImmediate(left, right);
    return left;
}

IExpression* ParserInterface::subtractImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) - getIntFrom(right);
    return new NumericLiteral(value);
}

IExpression* ParserInterface::Add(IExpression* left, IExpression* right) {
    if (!areNumeric(left, right)) throw;
    if (areConstant(left, right)) return addImmediate(left, right);
    return left;
}

IExpression* ParserInterface::addImmediate(IExpression* left, IExpression* right) {
    auto value = getIntFrom(left) + getIntFrom(right);
    return new NumericLiteral(value);
}

IExpression* ParserInterface::CompareGreaterOrEqual(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) throw;
    if (areConstant(left, right)) return compareGreaterEqualImmediate(left, right);
    return left;
}

IExpression* ParserInterface::compareGreaterEqualImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) >= getIntFrom(right);
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) >= getCharFrom(right);
            return new BooleanLiteral(value);
        }
        case STRING: throw;
        case BOOLEAN: {
            auto value = getBoolFrom(left) >= getBoolFrom(right);
            return new BooleanLiteral(value);
        };
        case USER_DEFINED: throw;
        default: throw;
    }
}

IExpression* ParserInterface::CompareGreater(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) throw;
    if (areConstant(left, right)) return compareGreaterImmediate(left, right);
    return left;
}

IExpression* ParserInterface::compareGreaterImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) > getIntFrom(right);
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) > getCharFrom(right);
            return new BooleanLiteral(value);
        }
        case STRING: throw;
        case BOOLEAN: {
            auto value = getBoolFrom(left) > getBoolFrom(right);
            return new BooleanLiteral(value);
        };
        case USER_DEFINED: throw;
        default: throw;
    }
}

IExpression* ParserInterface::CompareNotEqual(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) throw;
    if (areConstant(left, right)) return compareNotEqualImmediate(left, right);
    return left;
}

IExpression* ParserInterface::compareNotEqualImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) != getIntFrom(right);
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) != getCharFrom(right);
            return new BooleanLiteral(value);
        }
        case STRING: throw;
        case BOOLEAN: {
            auto value = getBoolFrom(left) != getBoolFrom(right);
            return new BooleanLiteral(value);
        };
        case USER_DEFINED: throw;
        default: throw;
    }
}

IExpression* ParserInterface::CompareEqual(IExpression* left, IExpression* right) {
    if (!areSameType(left, right)) throw;
    if (areConstant(left, right)) return compareNEqualImmediate(left, right);
    return left;
}

IExpression* ParserInterface::compareNEqualImmediate(IExpression* left, IExpression* right) {
    switch (left->GetType()) {
        case NUMERIC: {
            auto value = getIntFrom(left) == getIntFrom(right);
            return new BooleanLiteral(value);
        };
        case CHARACTER: {
            auto value = getCharFrom(left) == getCharFrom(right);
            return new BooleanLiteral(value);
        }
        case STRING: throw;
        case BOOLEAN: {
            auto value = getBoolFrom(left) == getBoolFrom(right);
            return new BooleanLiteral(value);
        };
        case USER_DEFINED: throw;
        default: throw;
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
    return left;
}

IExpression* ParserInterface::andImmediate(IExpression* left, IExpression* right) {
    auto value = getBoolFrom(left) && getBoolFrom(right);
    return new BooleanLiteral(value);
}

IExpression* ParserInterface::Or(IExpression* left, IExpression* right) {
    if (!areBoolean(left, right)) throw;
    if (areConstant(left, right)) return orImmediate(left, right);
    return left;
}

IExpression* ParserInterface::orImmediate(IExpression* left, IExpression* right) {
    auto value = getBoolFrom(left) || getBoolFrom(right);
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

#pragma clang diagnostic pop