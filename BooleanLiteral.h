//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_BOOLEAN_LITERAL_H
#define COMPILER_BOOLEAN_LITERAL_H


#include "Literal.h"

class BooleanLiteral : public Literal {
private:
    bool value_;
public:
    BooleanLiteral(bool value) : value_(value) {}
    bool GetValue() { return value_; }
    ExpressionType GetType() { return ExpressionType::BOOLEAN; }
};


#endif //COMPILER_BOOLEANLITERAL_H
