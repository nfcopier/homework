//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_NUMERIC_CONSTANT_H
#define COMPILER_NUMERIC_CONSTANT_H


#include "Literal.h"

class NumericLiteral : public Literal {
private:
    int value_;
public:
    NumericLiteral(int value) : value_(value) {}
    ExpressionType GetType() { return ExpressionType::NUMERIC; }
    int GetValue() { return value_; }

    IExpression* Not() { throw; }
    IExpression* GetSuccessor() { return new NumericLiteral( value_ + 1 ); }
    IExpression* GetPredecessor() { return new NumericLiteral( value_ - 1 ); }
    IExpression* CastToOrdinal() { return this; }
    IExpression* CastToCharacter();
    IExpression* Negate() { return new NumericLiteral(-value_); }
};


#endif //COMPILER_NUMERIC_CONSTANT_H
