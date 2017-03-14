//
// Created by floris on 2/22/17.
//

#ifndef COMPILER_ENCODER_H
#define COMPILER_ENCODER_H


#include <iostream>
#include <sstream>
#include <vector>
#include "ExpressionInRegister.h"
#include "Variable.h"

class Encoder {
private:
    std::ostream& out_;
    std::stringstream instructionBuffer;
    std::vector<std::string*> strings_;
    static Encoder* instance_;
protected:
    Encoder() : out_(std::cout) {}
public:
    static Encoder& Instance();
    ExpressionInRegister* Modulo(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* Divide(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* Multiply(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* Subtract(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* Add(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* CompareGreater(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* CompareGreaterOrEqual(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* CompareNotEqual(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* CompareEqual(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* Or(ExpressionInRegister& left, ExpressionInRegister& right);
    ExpressionInRegister* And(ExpressionInRegister& left, ExpressionInRegister& right);

    void EndProgram();
    void Assign(Variable& variable, ExpressionInRegister* reg);
    void Write(IExpression* value);
    ExpressionInRegister* Read(ExpressionType type);
    ExpressionInRegister* LoadImmediate(Literal* literal);
    ExpressionInRegister* LoadFrom(Variable* variable);
};


#endif //COMPILER_ENCODER_H
