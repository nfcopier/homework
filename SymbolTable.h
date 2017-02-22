//
// Created by floris on 2/20/17.
//

#ifndef COMPILER_SYMBOL_TABLE_H
#define COMPILER_SYMBOL_TABLE_H


#include <map>
#include <vector>
#include "Symbol.h"

class SymbolTable {

private:
    std::map<char*, Symbol*> predefined_;
    std::map<char*, Symbol*> global_;
    std::vector<std::map<char*, Symbol*>> localStack_;
    static SymbolTable* instance_;
    SymbolTable() {};

public:
    static SymbolTable& Instance();
    IExpression * GetFor(char* identifier);
    void Add(std::string& typeName, std::string& identifier);
    bool inLocalScope();
    void addToLocal(std::string& typeName, std::string& identifier);
};


#endif //COMPILER_SYMBOL_TABLE_H
