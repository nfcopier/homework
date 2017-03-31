//
// Created by floris on 3/29/17.
//

#include "FunctionDefinition.h"

FunctionDefinition::FunctionDefinition(std::string* functionName) : stackSize_(0), functionName_(functionName) {
    for (auto funcName : functionNames_) {
        if (funcName->compare(*functionName_)) throw;
    }
    functionNames_.push_back(functionName_);
}

void FunctionDefinition::IncrementStackSizeBy(unsigned int variableSize) {
    stackSize_ += variableSize;
}

int FunctionDefinition::GetStackSize() {
    return stackSize_;
}

std::vector<std::string*> FunctionDefinition::functionNames_;
