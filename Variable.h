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
    static int currentAddress;
    int offset;
    std::string* typeName_;
    PointerType pointerType_;
public:
    Variable(std::string* typeName) : typeName_(typeName), offset(currentAddress++) {
        auto t = typeName;
    }
    bool IsConstant() { return false; }
    int GetAddress() { return offset; }
    std::string* GetTypeName() { return typeName_; }
    ExpressionType GetType();
    void Set(PointerType pointerType) {
        pointerType_ = pointerType;
    }
    ~Variable() { currentAddress--; }
};


#endif //COMPILER_VARIABLE_H
