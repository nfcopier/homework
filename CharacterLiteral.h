//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_CHARACTER_CONSTANT_H
#define COMPILER_CHARACTER_CONSTANT_H


#include "Literal.h"
#include "NumericLiteral.h"

class CharacterLiteral : public Literal {
private:
    char value_;
public:
    CharacterLiteral(char value) : value_(value) {}
    ExpressionType GetType() { return ExpressionType::CHARACTER; }
    char GetValue() { return value_; }

    IExpression* GetSuccessor() { return new CharacterLiteral(value_ + (char)1); }
    IExpression* GetPredecessor() { return new CharacterLiteral(value_ - (char)1); }
    IExpression* CastToOrdinal();
    IExpression* CastToCharacter() { return this; }
    IExpression* Negate() { throw; }
    IExpression* Not() { throw; }
};


#endif //COMPILER_CHARACTER_CONSTANT_H
