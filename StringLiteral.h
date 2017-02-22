//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_STRING_CONSTANT_H
#define COMPILER_STRING_CONSTANT_H


#include <string>
#include "Literal.h"

class StringLiteral : public Literal {
private:
    std::string& value_;
public:
    StringLiteral(std::string& value) : value_(value) {}
    ExpressionType GetType() { return ExpressionType::STRING; }

    IExpression* GetSuccessor() { throw; }
    IExpression* GetPredecessor() { throw; }
    IExpression* CastToOrdinal() { throw; }
    IExpression* CastToCharacter() { throw; }
    IExpression* Negate() { throw; }
    IExpression* Not() { throw; }
};


#endif //COMPILER_STRING_CONSTANT_H
