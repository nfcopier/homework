//
// Created by floris on 2/20/17.
//

#ifndef COMPILER_SYMBOL_H
#define COMPILER_SYMBOL_H

#include "IExpression.h"


class Symbol {
protected:
    Symbol() {}
public:
    virtual bool IsConstant() = 0;
    virtual ExpressionType GetType() = 0;
};


#endif //COMPILER_SYMBOL_H
