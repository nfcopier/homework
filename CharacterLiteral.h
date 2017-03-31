//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_CHARACTER_CONSTANT_H
#define COMPILER_CHARACTER_CONSTANT_H


#include "Literal.h"
#include "NumericLiteral.h"

class CharacterLiteral : public Literal {
private:
    char value_;
public:
    CharacterLiteral(char* value, int length);
    CharacterLiteral(char value) : value_(value) {}
    ExpressionType GetType() { return ExpressionType::CHARACTER; }
    char GetValue() { return value_; }
};


#endif //COMPILER_CHARACTER_CONSTANT_H
