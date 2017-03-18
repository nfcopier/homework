//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_VARIABLE_H
#define COMPILER_VARIABLE_H


#include <string>
#include "Symbol.h"
#include "IExpression.h"

enum PointerType {
    Global,
    Frame,
    Stack
};

class Variable : public Symbol {
private:
    static int currentOffset;
    int offset_;
    PointerType pointerType_;
    std::string* typeName_;
public:
    void incrementOffset();

    Variable(std::string* typeName, PointerType pointerType) : pointerType_(pointerType), offset_(currentOffset) {
        if (*typeName == "INTEGER") typeName_ = new std::string("integer");
        else if (*typeName == "BOOLEAN") typeName_ = new std::string("boolean");
        else if (*typeName == "CHAR") typeName_ = new std::string("char");
        else typeName_ = typeName;
        incrementOffset();
    }
    bool IsConstant() { return false; }
    int GetOffset() { return offset_; }
    PointerType GetPointerType() { return pointerType_; }
    ExpressionType GetType();
};


#endif //COMPILER_VARIABLE_H
