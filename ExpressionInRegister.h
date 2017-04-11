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
    static bool registersInUse_[ADDRESS_COUNT];
    static unsigned int registersUsed_;
    unsigned int address_;
    bool isCopied_;
    ExpressionType expressionType_;
    unsigned int getNextAvailableAddress() {
        for (auto address = 0u; address < ADDRESS_COUNT; address++) {
            if (registersInUse_[address]) return address;
        }
        throw;
    }

public:
    ExpressionType GetType() { return expressionType_; }
    bool IsConstant() { return false; }
    ExpressionInRegister(ExpressionType expressionType) : isCopied_(false), expressionType_(expressionType) {
        address_ = getNextAvailableAddress();
        registersInUse_[address_] = false;
        if (address_ + 1u > registersUsed_) registersUsed_ = address_ + 1u;
    }
    ExpressionInRegister(ExpressionInRegister const& expr) : isCopied_(true), address_(expr.address_), expressionType_(expr.expressionType_) {}
    int GetAddress() { return address_; }
    static unsigned int GetRegistersUsed() { return registersUsed_; }
    static void ClearRegistersUsed() { registersUsed_ = 0u; }
    virtual IExpression* ToOrdinal();
    virtual IExpression* ToCharacter();
    unsigned int GetSize() { return 4; }
    ~ExpressionInRegister() {
        if (!isCopied_) registersInUse_[address_] = true;
    }
};


#endif //COMPILER_EXPRESSION_IN_REGISTER_H
