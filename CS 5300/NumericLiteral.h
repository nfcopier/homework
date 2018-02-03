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
    Type& GetType() override { return Type::NUMERIC; }
    void Succeed() { value_++; };
    void Precede() { value_--; };
    IExpression* ToOrdinal() { throw; }
    IExpression* ToCharacter();
    void Negate() { value_ = -value_; }
    int GetValue() { return value_; }
};


#endif //COMPILER_NUMERIC_CONSTANT_H
