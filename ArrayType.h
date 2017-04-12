//
// Created by floris on 4/11/17.
//

#ifndef COMPILER_ARRAY_TYPE_H
#define COMPILER_ARRAY_TYPE_H


#include "Type.h"

class ArrayType : public Type {
private:
    int lowerIndex_;
    int upperIndex_;
    Type& elementType_;
protected:
    TypeType GetType() { return ARRAY; }
    bool haveSameStructure(Type& otherType);
public:
    ArrayType(int lowerIndex, int upperIndex, Type& elementType);
    unsigned int GetSize();
    bool IsPrimitive() { return false; }
};


#endif //COMPILER_ARRAY_TYPE_H
