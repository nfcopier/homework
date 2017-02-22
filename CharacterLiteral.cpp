//
// Created by floris on 2/22/17.
//


#include "CharacterLiteral.h"

IExpression* CharacterLiteral::CastToOrdinal() {
    return new NumericLiteral( (int)value_ );
}
