//
// Created by floris on 4/11/17.
//

#ifndef COMPILER_ARRAY_TYPE_H
#define COMPILER_ARRAY_TYPE_H


#include "Type.h"

class ArrayType : public Type {
private:
    unsigned int lowerIndex_;
    unsigned int upperIndex_;
    Type& elementType_;
protected:
    TypeType GetType() { return ARRAY; }
    bool haveSameStructure(Type& otherType);
public:
    ArrayType(unsigned int lowerIndex, unsigned int upperIndex, Type& elementType);
    unsigned int GetSize();
    bool IsPrimitive() { return false; }
    Field& GetField() { return *(new Field(lowerIndex_, elementType_)); }
};


#endif //COMPILER_ARRAY_TYPE_H
