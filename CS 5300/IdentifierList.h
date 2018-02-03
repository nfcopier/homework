//
// Created by floris on 2/21/17.
//

#ifndef COMPILER_IDENTIFIER_LIST_H
#define COMPILER_IDENTIFIER_LIST_H


#include <vector>
#include <string>
#include <ostream>
#include "Type.h"

struct IdentifierList {
    Type& TheType;
    std::vector<std::string*>& Identifiers;
    IdentifierList(Type& type, std::vector<std::string*>* identifiers) : TheType(type), Identifiers(*identifiers) {}
};


#endif //COMPILER_IDENTIFIER_LIST_H
