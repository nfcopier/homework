//
// Created by floris on 3/31/17.
//

#ifndef COMPILER_I_PARAMETER_H
#define COMPILER_I_PARAMETER_H


enum ExpressionType {
    NUMERIC,
    CHARACTER,
    STRING,
    BOOLEAN,
    USER_DEFINED
};

class IParameter {
protected:
    IParameter() {}
public:
    virtual bool IsString() = 0;
    virtual bool IsVariable() = 0;
    virtual unsigned int GetSize() = 0;
    virtual ExpressionType GetType() = 0;
};

#endif //COMPILER_I_PARAMETER_H
