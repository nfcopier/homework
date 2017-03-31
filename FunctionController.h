//
// Created by floris on 3/29/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedStructInspection"
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
#ifndef COMPILER_FUNCTION_CONTROLLER_H
#define COMPILER_FUNCTION_CONTROLLER_H


#include "Encoder.h"
#include "SymbolTable.h"
#include "FunctionDefinition.h"
#include "ExpressionInRegister.h"
#include "IParameter.h"
#include "Parameter.h"

class FunctionController {
private:
    std::vector<FunctionDefinition*> functions_;
    FunctionController() {};
    static FunctionController* instance_;
    FunctionDefinition* getFunctionFor(std::string& functionName);
    FunctionDefinition* currentFunction_ = nullptr;
public:
    static FunctionController& Instance();
    void Set(FunctionDefinition* functionDefinition) { currentFunction_ = functionDefinition; }
    void Declare();
    void Start();
    void CreatePrologue();
    void CreateEpilogue();
    ExpressionInRegister* CallFunction(std::string* functionName, std::vector<IParameter*>* parameters);
    void CallProcedure(std::string* functionName, std::vector<IParameter*>* parameters);
    void SetReturnTypeAs(std::string* typeName);
    void Return(IExpression* expression);
    void Return();
};


#endif //COMPILER_FUNCTION_CONTROLLER_H

#pragma clang diagnostic pop