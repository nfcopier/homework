//
// Created by floris on 2/22/17.
//


#include "Variable.h"

int Variable::currentAddress = 0;

ExpressionType Variable::GetType() {
    if (*typeName_ == "integer") return ExpressionType::NUMERIC;
    if (*typeName_ == "boolean") return ExpressionType::BOOLEAN;
    if (*typeName_ == "string") return ExpressionType::STRING;
    if (*typeName_ == "character") return ExpressionType::CHARACTER;
    return ExpressionType::USER_DEFINED;
}
