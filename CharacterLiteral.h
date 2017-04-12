//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_CHARACTER_CONSTANT_H
#define COMPILER_CHARACTER_CONSTANT_H


#include "Literal.h"

class CharacterLiteral : public Literal {
private:
    char value_;
public:
    CharacterLiteral(char* value, int length);
    CharacterLiteral(char value) : value_(value) {}
    Type& GetType() { return Type::CHARACTER; }
    void Succeed() { value_++; };
    void Precede() { value_--; };
    IExpression* ToOrdinal();
    IExpression* ToCharacter() { throw; }
    char GetValue() { return value_; }
};


#endif //COMPILER_CHARACTER_CONSTANT_H
