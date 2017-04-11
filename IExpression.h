//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_I_EXPRESSION_H
#define COMPILER_I_EXPRESSION_H

#include "IParameter.h"

class IExpression : public IParameter {
protected:
    IExpression() {}
public:
    bool IsString() { return false; }
    bool IsVariable() { return false; }
    virtual bool IsConstant() = 0;
    unsigned int GetSize() { return 4; }
    virtual ~IExpression() {}
};

#endif //COMPILER_I_EXPRESSION_H
