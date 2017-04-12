//
// Created by floris on 3/29/17.
//

#ifndef COMPILER_FUNCTION_DEFINITION_H
#define COMPILER_FUNCTION_DEFINITION_H


#include <string>
#include <vector>
#include "ParameterDeclaration.h"

class FunctionDefinition {
private:
    int stackSize_;
    std::string* functionName_;
    unsigned int registersUsed_;
    std::vector<ParameterDeclaration*>* parameterDeclarations_;
    bool isForward_;
    Type* returnType_;
public:
    FunctionDefinition(std::string* functionName, std::vector<ParameterDeclaration*>* parameters);
    void IncrementStackSizeBy(unsigned int variableSize);
    std::string& GetFunctionName() { return *functionName_; }
    void SetRegistersUsed(unsigned int registersUsed) { registersUsed_ = registersUsed; }
    unsigned int GetRegistersUsed() { return registersUsed_; }
    int GetStackSize();
    void SetIsForward() { isForward_ = true; }
    void ClearIsForward() { isForward_ = false; }
    bool IsForward() { return isForward_; }
    std::vector<ParameterDeclaration*>& GetDeclarations() { return *parameterDeclarations_; }
    void SetReturnTypeAs(Type& type) { returnType_ = &type; };
    Type& GetReturnType() { return *returnType_; }
    unsigned int GetParameterSize();
};


#endif //COMPILER_FUNCTION_DEFINITION_H
