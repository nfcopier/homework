//
// Created by floris on 2/20/17.
//

#include "SymbolTable.h"
#include "Variable.h"

SymbolTable& SymbolTable::Instance() {
    if (instance_ == nullptr) instance_ = new SymbolTable();
    return *instance_;
}

IExpression* SymbolTable::GetFor(char* identifier) {
    return new Variable(0, *(new std::string("")));
}

SymbolTable* SymbolTable::instance_ = nullptr;

void SymbolTable::Add(std::string& typeName, std::string& identifier) {
    if (inLocalScope()) addToLocal(typeName, identifier);
}

bool SymbolTable::inLocalScope() {
    return localStack_.size() > 0;
}

void SymbolTable::addToLocal(std::string& typeName, std::string& identifier) {
}
