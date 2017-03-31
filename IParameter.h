//
// Created by floris on 3/31/17.
//

#ifndef COMPILER_I_PARAMETER_H
#define COMPILER_I_PARAMETER_H

class IParameter {
protected:
    IParameter() {}
public:
    virtual bool IsString() = 0;
};

#endif //COMPILER_I_PARAMETER_H
