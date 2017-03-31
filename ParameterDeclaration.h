//
// Created by floris on 3/31/17.
//

#ifndef COMPILER_PARAMETER_DECLARATIONS_H
#define COMPILER_PARAMETER_DECLARATIONS_H


#include "Variable.h"
#include "IdentifierList.h"

class ParameterDeclaration {
private:
    bool isReference_;
    IdentifierList* identifiers_;
public:
    IdentifierList& GetIdentifiers() { return *identifiers_; }
    bool IsReference() { return isReference_; }
    ParameterDeclaration( bool isReference, IdentifierList* identifierList ) : isReference_(isReference), identifiers_(identifierList) {}
};


#endif //COMPILER_PARAMETER_DECLARATIONS_H
