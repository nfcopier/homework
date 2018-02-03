//
// Created by floris on 4/12/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedStructInspection"
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
#ifndef COMPILER_TYPE_CONTROLLER_H
#define COMPILER_TYPE_CONTROLLER_H


#include <map>
#include "NumericLiteral.h"
#include "ArrayType.h"
#include "RecordType.h"
#include "FunctionDefinition.h"
#include "SymbolTable.h"
#include "Encoder.h"

class TypeController {
private:
    std::map<std::string, Type*> globalTypes_;
    static TypeController* instance_;
    FunctionDefinition* currentFunction_;
public:
    TypeController();
    static TypeController& Instance();
    Type& GetTypeFrom(std::string* typeName);
    ArrayType* CreateArrayTypeFrom(IExpression* lowerIndex, IExpression* upperIndex, Type& type);
    RecordType* CreateRecordTypeFrom(std::vector<IdentifierList*>& identifierList);
    void Add(std::string* typeName, Type& type);
    void Set(FunctionDefinition& function) { currentFunction_ = &function; }
    void ClearFunction() { currentFunction_ = nullptr; }
    Variable& GetFieldFor(Variable& variable, std::string* typeName);
    Variable& GetIndexFor(Variable& variable, IExpression* index);
    Variable& GetVariableFor( std::string* typeName );

    Variable& getVariableFor(Variable& variable, NumericLiteral& numericLiteral) const;
};


#endif //COMPILER_TYPE_CONTROLLER_H

#pragma clang diagnostic pop