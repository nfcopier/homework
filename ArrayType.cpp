//
// Created by floris on 4/11/17.
//

#include "ArrayType.h"

bool ArrayType::haveSameStructure(Type& otherType) {
    if (otherType.GetType() != ARRAY) return false;
    auto& otherArray = (ArrayType&)otherType;
    return
            lowerIndex_ == otherArray.lowerIndex_ and
            upperIndex_ == otherArray.upperIndex_ and
            elementType_ == otherArray.elementType_;
}

ArrayType::ArrayType(unsigned int lowerIndex, unsigned int upperIndex, Type& elementType) :
        lowerIndex_(lowerIndex),
        upperIndex_(upperIndex),
        elementType_(elementType) {}

unsigned int ArrayType::GetSize() {
    return elementType_.GetSize() * (upperIndex_ - lowerIndex_);
}
