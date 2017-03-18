//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_EXPRESSION_IN_REGISTER_H
#define COMPILER_EXPRESSION_IN_REGISTER_H


#include "Variable.h"
#include "Literal.h"
#define ADDRESS_COUNT 10

class ExpressionInRegister : public IExpression {
private:
    static bool addresses_[ADDRESS_COUNT];
    int address_;
    bool isCopied_;
    ExpressionType expressionType_;
    int getNextAvailableAddress() {
        for (auto address = 0; address < ADDRESS_COUNT; address++) {
            if (addresses_[address]) return address;
        }
        throw;
    }

public:
    ExpressionType GetType() { return expressionType_; }
    bool IsConstant() { return false; }
    IExpression* Not() { return this; }
    IExpression* GetSuccessor() { return this; }
    IExpression* GetPredecessor() { return this; }
    IExpression* CastToOrdinal() { return this; }
    IExpression* CastToCharacter() { return this; }
    IExpression* Negate() { return this; }
    ExpressionInRegister(ExpressionType expressionType) : isCopied_(false), expressionType_(expressionType) {
        address_ = getNextAvailableAddress();
        addresses_[address_] = false;
    }
    ExpressionInRegister(ExpressionInRegister const& expr) : isCopied_(true), address_(expr.address_), expressionType_(expr.expressionType_) {}
    int GetAddress() { return address_; }
    ~ExpressionInRegister() {
        if (!isCopied_) addresses_[address_] = true;
    }
};


#endif //COMPILER_EXPRESSION_IN_REGISTER_H
