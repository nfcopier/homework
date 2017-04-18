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
    Stack,
    Register
};

class Variable : public IParameter, public Symbol {
private:
    static int currentGlobalOffset_;
    static int currentStackOffset_;
    static int currentFrameOffset_;
    int offset_;
    PointerType pointerType_;
    Type& type_;
    unsigned int registerNumber_;
public:
    void doOffset();
    Variable(Type& type, PointerType pointerType, int offset) :
            type_(type), pointerType_(pointerType), offset_(offset) {}
    Variable(Type& type, PointerType pointerType) : type_(type), pointerType_(pointerType) {
        doOffset();
    }
    Variable(Type& type, int offset, unsigned int registerNumber, bool removeAmbiguity) :
            type_(type), pointerType_(Register), offset_(offset), registerNumber_(registerNumber) {}
    bool IsConstant() { return false; }
    int GetOffset() { return offset_; }
    PointerType GetPointerType() { return pointerType_; }
    Type& GetType() { return type_; }
    unsigned int GetSize() { return type_.GetSize(); }
    static void ClearFrame() { currentFrameOffset_ = 0; }
    virtual bool IsReference() { return false; }
    bool IsVariable() { return true; }
    unsigned int GetRegisterNumber() { if (pointerType_ != Register) throw;
        return registerNumber_;
    }
};


#endif //COMPILER_VARIABLE_H
