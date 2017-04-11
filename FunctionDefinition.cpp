//
// Created by floris on 3/29/17.
//

#include <numeric>
#include "FunctionDefinition.h"

FunctionDefinition::FunctionDefinition(std::string* functionName, std::vector<ParameterDeclaration*>* parameters) :
        stackSize_(20),
        isForward_(false),
        parameterDeclarations_(parameters),
        functionName_(functionName) {}

void FunctionDefinition::IncrementStackSizeBy(unsigned int variableSize) {
    stackSize_ += variableSize;
}

int FunctionDefinition::GetStackSize() {
    return stackSize_;
}

unsigned int getSizeOf(unsigned int currentValue, ParameterDeclaration* parameters) {
    auto identifiers = parameters->GetIdentifiers().Identifiers;
    return currentValue + (unsigned int)identifiers.size() * 4u;
}

unsigned int FunctionDefinition::GetParameterSize() {
    return std::accumulate(parameterDeclarations_->begin(), parameterDeclarations_->end(), 0u, getSizeOf) + 4u;
}
