//
// Created by floris on 2/20/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedStructInspection"
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
#ifndef COMPILER_PARSER_INTERFACE_H
#define COMPILER_PARSER_INTERFACE_H

#include "IdentifierList.h"
#include "NumericLiteral.h"
#include "StringLiteral.h"
#include "CharacterLiteral.h"
#include "BooleanLiteral.h"
#include "Variable.h"
#include "Constant.h"
#include "ExpressionInRegister.h"
#include "Encoder.h"


class ParserInterface {
private:
    ParserInterface() {};
    static ParserInterface* instance_;

    IExpression* moduloImmediate(IExpression* left, IExpression* right);
    IExpression* divideImmediate(IExpression* left, IExpression* right);
    IExpression* multiplyImmediate(IExpression* left, IExpression* right);
    IExpression* subtractImmediate(IExpression* left, IExpression* right);
    IExpression* addImmediate(IExpression* left, IExpression* right);

    IExpression* compareGreaterEqualImmediate(IExpression* left, IExpression* right);
    IExpression* compareGreaterImmediate(IExpression* left, IExpression* right);
    IExpression* compareNotEqualImmediate(IExpression* left, IExpression* right);
    IExpression* compareEqualImmediate(IExpression* left, IExpression* right);

    IExpression* andImmediate(IExpression* left, IExpression* right);
    IExpression* orImmediate(IExpression* left, IExpression* right);

    bool areConstant(IExpression* left, IExpression* right) const;
    bool areSameType(IExpression* left, IExpression* right);
    int getIntFrom(const IExpression* expr) const;
    bool areNumeric(IExpression* left, IExpression* right) const;
    bool areBoolean(IExpression* left, IExpression* right);
    char getCharFrom(IExpression* expr);
    bool getBoolFrom(IExpression* expr);
    ExpressionInRegister* getRegisterFor(IExpression* expr);

public:
    static ParserInterface& Instance();
    void AddVariables(std::vector<IdentifierList*>* identifiersByType);
    void StartProgram();
    void EndProgram();
    void StartBlock();
    void EndBlock();

    Symbol* GetSymbolFor(std::string* identifier);
    IExpression* GetExpressionFrom(Symbol* symbol);
    IExpression* GetSuccessorFor(IExpression* expression);
    IExpression* GetPredecessorFor(IExpression* expression);
    IExpression* CastToOrdinal(IExpression* expression);
    IExpression* CastToCharacter(IExpression* expression);

    IExpression* Negate(IExpression* expression);
    IExpression* Not(IExpression* expression);

    IExpression* Modulo(IExpression* left, IExpression* right);
    IExpression* Divide(IExpression* left, IExpression* right);
    IExpression* Multiply(IExpression* left, IExpression* right);
    IExpression* Subtract(IExpression* left, IExpression* right);
    IExpression* Add(IExpression* left, IExpression* right);

    IExpression* CompareGreaterOrEqual(IExpression* left, IExpression* right);
    IExpression* CompareGreater(IExpression* left, IExpression* right);
    IExpression* CompareNotEqual(IExpression* left, IExpression* right);
    IExpression* CompareEqual(IExpression* left, IExpression* right);

    IExpression* And(IExpression* left, IExpression* right);
    IExpression* Or(IExpression* left, IExpression* right);

    void Assign(Symbol* variable, IExpression* rvalue);
    void Write(std::vector<IExpression*>* expressions);
    void Read(std::vector<Symbol*>* symbols);
};


#endif //COMPILER_PARSER_INTERFACE_H

#pragma clang diagnostic pop