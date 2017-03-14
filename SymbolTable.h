//
// Created by floris on 2/20/17.
//

#ifndef COMPILER_SYMBOL_TABLE_H
#define COMPILER_SYMBOL_TABLE_H


#include <map>
#include <vector>
#include "ExpressionInRegister.h"
#include "Variable.h"
#include "Constant.h"
#include "Literal.h"

class SymbolTable {

private:
    std::map<std::string, Symbol*> predefined_;
    std::map<std::string, Symbol*> global_;
    std::vector<std::map<std::string, Symbol*>> localStack_;
    static SymbolTable* instance_;

    bool inLocalScope();
    void addToLocal(std::string* identifier, Variable* value);
    void addToGlobal(std::string* identifier, Variable* value);
    Symbol* find(std::string* identifier);
    bool isInLocal(std::string* identifier);
    Symbol* getFromLocal(std::string* identifier);
    bool isInGlobal(std::string* identifier);
    bool isInPredefined(std::string* identifier);

protected:
    SymbolTable() {};

public:
    static SymbolTable& Instance();
    Symbol* GetFor(std::string* identifier);
    void Add(std::string* identifier, Variable* value);
    void EnterLocalScope();
    void ExitLocalScope();
};


#endif //COMPILER_SYMBOL_TABLE_H
