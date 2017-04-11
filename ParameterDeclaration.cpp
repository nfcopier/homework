//
// Created by floris on 3/31/17.
//

#include "ParameterDeclaration.h"

ExpressionType ParameterDeclaration::GetType() {
    auto typeName = *identifiers_->TypeName;
    if (typeName == "INTEGER" or typeName == "integer")
        return NUMERIC;
    if (typeName == "CHAR" or typeName == "char")
        return CHARACTER;
    if (typeName == "BOOLEAN" or typeName == "boolean")
        return BOOLEAN;
    throw;
}
