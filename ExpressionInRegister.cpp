//
// Created by floris on 2/22/17.
//


#include "ExpressionInRegister.h"

IExpression* ExpressionInRegister::ToOrdinal() {
    if (expressionType_ != CHARACTER) throw;
    expressionType_ = NUMERIC;
    return this;
}

IExpression* ExpressionInRegister::ToCharacter() {
    if (expressionType_ != NUMERIC) throw;
    expressionType_ = CHARACTER;
    return this;
}


bool ExpressionInRegister::registersInUse_[] = {
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
};

unsigned int ExpressionInRegister::registersUsed_ = 0u;
