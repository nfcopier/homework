//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_LITERAL_H
#define COMPILER_LITERAL_H


#include "IExpression.h"

class Literal : public IExpression {
protected:
    Literal() {}
public:
    bool IsConstant() { return true; }
};

#endif //COMPILER_LITERAL_H
