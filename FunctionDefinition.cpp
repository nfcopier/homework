//
// Created by floris on 3/29/17.
//

#include "FunctionDefinition.h"

FunctionDefinition::FunctionDefinition(std::string* functionName, std::vector<ParameterDeclaration*>* parameters) :
        stackSize_(0),
        isForward_(false),
        parameterDeclarations_(parameters),
        functionName_(functionName) {}

void FunctionDefinition::IncrementStackSizeBy(unsigned int variableSize) {
    stackSize_ += variableSize;
}

int FunctionDefinition::GetStackSize() {
    return stackSize_;
}