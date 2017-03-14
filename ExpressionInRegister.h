//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_EXPRESSION_IN_REGISTER_H
#define COMPILER_EXPRESSION_IN_REGISTER_H


#include "Variable.h"
#include "Literal.h"

class ExpressionInRegister : public IExpression {
private:
    static int addressCount;
    int address_;

public:
    ExpressionType GetType() { return NUMERIC; }
    bool IsConstant() { return false; }
    IExpression* Not() { return this; }
    IExpression* GetSuccessor() { return this; }
    IExpression* GetPredecessor() { return this; }
    IExpression* CastToOrdinal() { return this; }
    IExpression* CastToCharacter() { return this; }
    IExpression* Negate() { return this; }
    ExpressionInRegister(Variable& variable) : address_(addressCount++) {}
    ExpressionInRegister(Literal* literal) : address_(addressCount++) {}
    ExpressionInRegister(ExpressionType type) : address_(addressCount++) {}
    int GetAddress() { return address_; }
    ~ExpressionInRegister() { addressCount--; }
};


#endif //COMPILER_EXPRESSION_IN_REGISTER_H
