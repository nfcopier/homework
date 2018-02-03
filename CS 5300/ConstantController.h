//
// Created by floris on 4/3/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
#pragma ide diagnostic ignored "OCUnusedStructInspection"
#ifndef COMPILER_CONSTANT_CONTROLLER_H
#define COMPILER_CONSTANT_CONTROLLER_H


#include <string>
#include "IExpression.h"
#include "Constant.h"

class ConstantController {
private:
    static ConstantController* instance_;
public:
    static ConstantController& Instance();
    void Add(std::string* identifier, IExpression* expression);
};


#endif //COMPILER_CONSTANT_CONTROLLER_H

#pragma clang diagnostic pop