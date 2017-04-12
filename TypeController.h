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
};


#endif //COMPILER_TYPE_CONTROLLER_H

#pragma clang diagnostic pop