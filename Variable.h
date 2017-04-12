//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_VARIABLE_H
#define COMPILER_VARIABLE_H


#include <string>
#include "Symbol.h"
#include "IParameter.h"

enum PointerType {
    Global,
    Frame,
    Stack
};

class Variable : public IParameter, public Symbol {
private:
    static int currentGlobalOffset_;
    static int currentStackOffset_;
    static int currentFrameOffset_;
    int offset_;
    PointerType pointerType_;
    ExpressionType type_;
    ExpressionType getTypeFrom(std::string* typeName);
public:
    void doOffset();
    Variable(ExpressionType type, PointerType pointerType, int offset) :
            type_(type), pointerType_(pointerType), offset_(offset) {}
    Variable(ExpressionType type, PointerType pointerType) : type_(type), pointerType_(pointerType) {
        doOffset();
    }
    Variable(std::string* typeName, PointerType pointerType) : pointerType_(pointerType) {
        type_ = getTypeFrom(typeName);
        doOffset();
    }
    bool IsConstant() { return false; }
    int GetOffset() { return offset_; }
    PointerType GetPointerType() { return pointerType_; }
    ExpressionType GetType() { return type_; }
    unsigned int GetSize() { return 4; }
    bool IsString() { return false; }
    static void ClearFrame() { currentFrameOffset_ = -4; }
    virtual bool IsReference() { return false; }
    bool IsVariable() { return true; }
};


#endif //COMPILER_VARIABLE_H
