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
    virtual IExpression* GetSuccessor() = 0;
    virtual IExpression* GetPredecessor() = 0;
    virtual IExpression* CastToOrdinal() = 0;
    virtual IExpression* CastToCharacter() = 0;
    virtual IExpression* Negate() = 0;
    virtual IExpression* Not() = 0;
};

#endif //COMPILER_I_EXPRESSION_H
