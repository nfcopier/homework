//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_VARIABLE_H
#define COMPILER_VARIABLE_H


#include <string>
#include "Symbol.h"

class Variable : public Symbol {
private:
    int address_;
    std::string& typeName_;
public:
    Variable(int address, std::string& typeName) : address_(address), typeName_(typeName) {}
    bool IsConstant() { return false; }
    int GetAddress() { return address_; }
    std::string& GetTypeName() { return typeName_; }
    ExpressionType GetType();

    IExpression* GetSuccessor() { return new Variable(0, *(new std::string(""))); }
    IExpression* GetPredecessor() { return new Variable(0, *(new std::string(""))); }
    IExpression* CastToOrdinal()  { return new Variable(0, *(new std::string(""))); }
    IExpression* CastToCharacter()  { return new Variable(0, *(new std::string(""))); }
    IExpression* Negate() { return new Variable(0, *(new std::string(""))); }
    IExpression* Not() { return new Variable(0, *(new std::string(""))); }
};


#endif //COMPILER_VARIABLE_H
