//
// Created by floris on 3/29/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedStructInspection"
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
#ifndef COMPILER_FUNCTION_CONTROLLER_H
#define COMPILER_FUNCTION_CONTROLLER_H


#include "FunctionDefinition.h"
#include "ExpressionInRegister.h"
#include "IParameter.h"

class FunctionController {
private:
    FunctionController() {};
    static FunctionController* instance_;
public:
    static FunctionController& Instance();
    void Start(FunctionDefinition* function);
    void CreatePrologueFor(FunctionDefinition* function);
    void CreateEpilogueFor(FunctionDefinition* function);
    ExpressionInRegister* CallFunction(std::string* functionName, std::vector<IParameter*>* parameters);
    void CallProcedure(std::string* functionName, std::vector<IParameter*>* parameters);
};


#endif //COMPILER_FUNCTION_CONTROLLER_H

#pragma clang diagnostic pop