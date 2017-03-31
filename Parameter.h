//
// Created by floris on 3/31/17.
//

#ifndef COMPILER_PARAMETER_H
#define COMPILER_PARAMETER_H

#define WORD_SIZE 4


#include "Variable.h"

class Parameter : public Variable {
private:
    static unsigned int currentOffset_;
    bool isReference_;
public:
    bool IsReference() { return isReference_; }
    static void ClearOffset() { currentOffset_ = 0u; }
    Parameter(ExpressionType type, bool isReference) : isReference_(isReference), Variable(type, Frame, currentOffset_) {
        currentOffset_ += isReference ? WORD_SIZE : 4;
    }
    static unsigned int GetCurrentOffset() { return currentOffset_ + WORD_SIZE; }
};


#endif //COMPILER_PARAMETER_H
