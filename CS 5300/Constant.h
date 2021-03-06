//
// Created by floris on 2/22/17.
//

#ifndef COMPILER_CONSTANT_H
#define COMPILER_CONSTANT_H


#include "Symbol.h"
#include "Literal.h"

class Constant : public Symbol {
private:
    Literal* literal_;
public:
    Constant(Literal* literal) : literal_(literal) {}
    bool IsConstant() { return true; }
    Literal* GetLiteral() { return literal_; }
    Type& GetType() { return literal_->GetType(); }
};


#endif //COMPILER_CONSTANT_H
