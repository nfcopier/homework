//
// Created by floris on 2/22/17.
//


#include "Variable.h"

int Variable::currentOffset = 0;

ExpressionType Variable::GetType() {
    if (*typeName_ == "integer") return ExpressionType::NUMERIC;
    if (*typeName_ == "boolean") return ExpressionType::BOOLEAN;
    if (*typeName_ == "string") return ExpressionType::STRING;
    if (*typeName_ == "char") return ExpressionType::CHARACTER;
    return ExpressionType::USER_DEFINED;
}

void Variable::incrementOffset() {
    switch (GetType()) {
        case NUMERIC:
        case BOOLEAN:
        case CHARACTER: {
            currentOffset += 4;
        };
        case STRING:break;
        case USER_DEFINED:break;
    }
}
