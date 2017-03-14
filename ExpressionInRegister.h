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
    bool isCopied_;
    ExpressionType expressionType_;

public:
    ExpressionType GetType() { return expressionType_; }
    bool IsConstant() { return false; }
    IExpression* Not() { return this; }
    IExpression* GetSuccessor() { return this; }
    IExpression* GetPredecessor() { return this; }
    IExpression* CastToOrdinal() { return this; }
    IExpression* CastToCharacter() { return this; }
    IExpression* Negate() { return this; }
    ExpressionInRegister(ExpressionType expressionType) : isCopied_(false),  address_(addressCount++), expressionType_(expressionType) {}
    ExpressionInRegister(ExpressionInRegister const& expr) : isCopied_(true), address_(expr.address_), expressionType_(expr.expressionType_) {}
    int GetAddress() { return address_; }
    ~ExpressionInRegister() {
        if (!isCopied_) addressCount--;
    }
};


#endif //COMPILER_EXPRESSION_IN_REGISTER_H
