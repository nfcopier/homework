//
// Created by floris on 3/29/17.
//

#ifndef COMPILER_FUNCTION_DEFINITION_H
#define COMPILER_FUNCTION_DEFINITION_H


#include <string>
#include <vector>

class FunctionDefinition {
private:
    int stackSize_;
    std::string* functionName_;
    static std::vector<std::string*> functionNames_;
    unsigned int registersUsed_;
public:
    FunctionDefinition(std::string* functionName);
    void IncrementStackSizeBy(unsigned int variableSize);
    std::string& GetFunctionName() { return *functionName_; }
    void SetRegistersUsed(unsigned int registersUsed) { registersUsed_ = registersUsed; }
    unsigned int GetRegistersUsed() { return registersUsed_; }
    int GetStackSize();
};


#endif //COMPILER_FUNCTION_DEFINITION_H
