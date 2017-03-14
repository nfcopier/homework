//
// Created by floris on 2/20/17.
//

#include "SymbolTable.h"

SymbolTable& SymbolTable::Instance() {
    if (instance_ == nullptr) instance_ = new SymbolTable();
    return *instance_;
}

Symbol* SymbolTable::GetFor(std::string* identifier) {
    return find(identifier);
}

Symbol* SymbolTable::find(std::string* identifier) {
    if (isInLocal(identifier)) return getFromLocal(identifier);
    if (isInGlobal(identifier)) return global_[*identifier];
    if (isInPredefined(identifier)) return predefined_[*identifier];
    throw;
}

bool SymbolTable::isInLocal(std::string* identifier) {
    if (!inLocalScope()) return false;
    auto& table = localStack_.back();
    return (bool)table.count(*identifier);
}

Symbol* SymbolTable::getFromLocal(std::string* identifier) {
    auto& table = localStack_.back();
    return table[*identifier];
}

bool SymbolTable::isInGlobal(std::string* identifier) {
    return (bool)global_.count(*identifier);
}

bool SymbolTable::isInPredefined(std::string* identifier) {
    return (bool)predefined_.count(*identifier);
}

SymbolTable* SymbolTable::instance_ = nullptr;

void SymbolTable::Add(std::string* identifier, Variable* value) {
    if (inLocalScope()) addToLocal(identifier, value);
    else addToGlobal(identifier, value);
}

bool SymbolTable::inLocalScope() {
    return localStack_.size() > 0;
}

void SymbolTable::addToLocal(std::string* identifier, Variable* value) {
    auto& table = localStack_.back();
    if (table.count(*identifier)) throw;
    table[*identifier] = value;
}

void SymbolTable::addToGlobal(std::string* identifier, Variable* value) {
    if (global_.count(*identifier)) throw;
    global_[*identifier] = value;
}

void SymbolTable::EnterLocalScope() {
    localStack_.push_back(std::map<std::string, Symbol*>());
}

void SymbolTable::ExitLocalScope() {
    localStack_.pop_back();
}
