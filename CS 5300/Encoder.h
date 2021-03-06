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
#include "WhileStatement.h"
#include "RepeatStatement.h"
#include "IfChain.h"
#include "FunctionDefinition.h"

class Encoder {
private:
    std::ostream& out_;
    std::stringstream instructionBuffer_;
    std::vector<std::string*> strings_;
    static Encoder* instance_;
    std::string getAddressFrom(Variable&);
    std::string getPointerFrom(Variable&);
    void returnVariable(Variable& variable);
    void returnConstant(Literal& literal);
    void returnExpression(ExpressionInRegister& expression);
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

    void StartMain();
    void EndProgram();
    void Assign(Variable& variable, ExpressionInRegister* reg);
    void Write(IParameter* value);
    ExpressionInRegister* Read(Type& type);
    ExpressionInRegister* LoadImmediate(Literal* literal);
    ExpressionInRegister* LoadFrom(Variable* variable);

    void Start(WhileStatement& whileStatement);
    void Test(WhileStatement& whileStatement, ExpressionInRegister& condition);
    void End(WhileStatement& whileStatement);

    void Start(RepeatStatement& repeatStatement);
    void Test(RepeatStatement& repeatStatement, ExpressionInRegister& condition);

    void Test(IfChain& ifChain, ExpressionInRegister& condition);
    void Exit(IfChain& ifChain);
    void PrintElseLabelFor(IfChain& ifChain);
    void End(IfChain& ifChain);

    void Start(FunctionDefinition* function);
    void StartEpilogueFor(FunctionDefinition* functionDefinition);
    void StartPrologueFor(FunctionDefinition* function);
    void EndPrologueFor(FunctionDefinition* function);
    void IncrementStackPointerBy(int offset);
    void SaveRegisterToStack(unsigned int registerNumber, unsigned int variableOffset);
    void RestoreRegisterFromStack(unsigned int registerNumber, unsigned int variableOffset);
    void MoveFramePointerBy(int offset);
    void ReturnFrom(FunctionDefinition* definition);
    void Return(IParameter& returnValue, FunctionDefinition* definition);
    void CopyAddress(Variable& source, int destOffset);
    void CopyValue(Variable& source, int destOffset);
    void CopyExpression(ExpressionInRegister& providedParam, int destOffset);
    void Call(std::string& functionName);
    void LoadReturnValueInto(ExpressionInRegister& reg);

    void Succeed(ExpressionInRegister& expression);
    void Precede(ExpressionInRegister& expression);
    void Negate(ExpressionInRegister& expression);

    void Copy(Variable& destination, Variable& source);
    void MoveAddressToRegister(Variable destination, Variable& source, ExpressionInRegister& expression);
};


#endif //COMPILER_ENCODER_H
