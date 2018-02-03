//
// Created by floris on 2/22/17.
//


#include <cstdlib>
#include "CharacterLiteral.h"
#include "NumericLiteral.h"

char getValueFrom(char* value, int length);
char convertToEscaped(char value);
char convertToEscaped(char* value);

CharacterLiteral::CharacterLiteral(char* value, int length) : value_(getValueFrom(value, length)) {}

IExpression* CharacterLiteral::ToOrdinal() {
    return new NumericLiteral(value_);
}

char getValueFrom(char* value, int length) {
    switch (length) {
        case 0:
        case 1:
        case 2: throw;
        case 3: return value[1];
        case 4: return convertToEscaped(value[2]);
        default: return convertToEscaped(value+2);
    }
}

char convertToEscaped(char value) {
    switch (value) {
        case 'n': return '\n';
        case 't': return '\t';
        default: return value;
    }
}

char convertToEscaped(char* value) {
    return char(atoi(value));
}
