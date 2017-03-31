//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_I_EXPRESSION_H
#define COMPILER_I_EXPRESSION_H


enum ExpressionType {
    NUMERIC,
    CHARACTER,
    STRING,
    BOOLEAN,
    USER_DEFINED
};

class IExpression {
protected:
    IExpression() {}
public:
    virtual bool IsConstant() = 0;
    virtual ExpressionType GetType() = 0;
    virtual ~IExpression() {}
};

#endif //COMPILER_I_EXPRESSION_H
