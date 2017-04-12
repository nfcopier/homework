//
// Created by floris on 2/22/17.
//


#include "ExpressionInRegister.h"

IExpression* ExpressionInRegister::ToOrdinal() {
    if (type_ != Type::CHARACTER) throw;
    type_ = Type::NUMERIC;
    return this;
}

IExpression* ExpressionInRegister::ToCharacter() {
    if (type_ != Type::NUMERIC) throw;
    type_ = Type::CHARACTER;
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
