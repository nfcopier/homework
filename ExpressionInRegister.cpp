//
// Created by floris on 2/22/17.
//


#include "ExpressionInRegister.h"

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