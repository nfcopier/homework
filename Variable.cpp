//
// Created by floris on 2/22/17.
//


#include "Variable.h"

int Variable::currentGlobalOffset_ = 0;
int Variable::currentStackOffset_ = 0;
int Variable::currentFrameOffset_ = -4;

ExpressionType Variable::getTypeFrom(std::string* typeName) {
    if (*typeName == "integer") return ExpressionType::NUMERIC;
    if (*typeName == "INTEGER") return ExpressionType::NUMERIC;
    if (*typeName == "boolean") return ExpressionType::BOOLEAN;
    if (*typeName == "BOOLEAN") return ExpressionType::BOOLEAN;
    if (*typeName == "string") return ExpressionType::STRING;
    if (*typeName == "char") return ExpressionType::CHARACTER;
    if (*typeName == "CHAR") return ExpressionType::CHARACTER;
    return ExpressionType::USER_DEFINED;
}

void Variable::doOffset() {
    if (pointerType_ == Global) {
        offset_ = currentGlobalOffset_;
        currentGlobalOffset_ += GetSize();
    } else if (pointerType_ == Stack){
        offset_ = currentStackOffset_;
        currentStackOffset_ -= GetSize();
    } else {
        offset_ = currentFrameOffset_;
        currentFrameOffset_ -= GetSize();
    }
}
