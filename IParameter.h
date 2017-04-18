//
// Created by floris on 3/31/17.
//

#ifndef COMPILER_I_PARAMETER_H
#define COMPILER_I_PARAMETER_H

#include "Type.h"

class IParameter {
protected:
    IParameter() {}
public:
    virtual bool IsVariable() = 0;
    virtual unsigned int GetSize() = 0;
    virtual Type& GetType() = 0;
};

#endif //COMPILER_I_PARAMETER_H
