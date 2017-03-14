//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_IDENTIFIER_LIST_H
#define COMPILER_IDENTIFIER_LIST_H


#include <vector>
#include <string>
#include <ostream>

struct IdentifierList {
    std::string* TypeName;
    std::vector<std::string*>* Identifiers;
    IdentifierList(std::string* typeName, std::vector<std::string*>* identifiers) : TypeName(typeName), Identifiers(identifiers) {}
};


#endif //COMPILER_IDENTIFIER_LIST_H
