//
// Created by floris on 2/22/17.
//


#include "NumericLiteral.h"
#include "CharacterLiteral.h"

IExpression* NumericLiteral::CastToCharacter() {
    return new CharacterLiteral( (char)value_ );
}
