//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_STRING_CONSTANT_H
#define COMPILER_STRING_CONSTANT_H


#include <string>
#include "IParameter.h"

class StringLiteral : public IParameter {
private:
    std::string& value_;
public:
    StringLiteral(std::string& value) : value_(value) {}
    std::string* GetValue() { return &value_; }
    bool IsString() { return true; }
    bool IsVariable() { return false; }
    unsigned int GetSize() { return value_.size(); }
    ExpressionType GetType() { return STRING; }
};


#endif //COMPILER_STRING_CONSTANT_H
