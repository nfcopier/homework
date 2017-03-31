//
// Created by floris on 2/22/17.
//

#include "Encoder.h"
#include "NumericLiteral.h"
#include "CharacterLiteral.h"
#include "BooleanLiteral.h"
#include "StringLiteral.h"
#include "Parameter.h"

std::string getAddressFrom(Variable&);
std::string getPointerFrom(PointerType);

int getWriteCallNumberFrom(ExpressionType type);
int getReadCallNumberFrom(ExpressionType type);

void printOutStrings(std::ostream& out, std::vector<std::string*>& strings);
void printOutInstructions(std::stringstream& instructions, std::ostream& out);

Encoder& Encoder::Instance() {
    if (instance_ == nullptr) instance_ = new Encoder();
    return *instance_;
}

ExpressionInRegister* Encoder::Modulo(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(left.GetType());
    instructionBuffer_ << "div \t$t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    instructionBuffer_ << "mfhi\t$t" << outExpr->GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Divide(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(left.GetType());
    instructionBuffer_ << "div \t$t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    instructionBuffer_ << "mflo\t$t" << outExpr->GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Multiply(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(left.GetType());
    instructionBuffer_ << "mult\t$t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    instructionBuffer_ << "mflo\t$t" << outExpr->GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Subtract(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(left.GetType());
    instructionBuffer_ << "sub \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Add(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(left.GetType());
    instructionBuffer_ << "add \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareGreater(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(ExpressionType::BOOLEAN);
    instructionBuffer_ << "slt \t$t" << outExpr->GetAddress() << ", $t" << right.GetAddress() << ", $t" << left.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareGreaterOrEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(ExpressionType::BOOLEAN);
    instructionBuffer_ << "sle \t$t" << outExpr->GetAddress() << ", $t" << right.GetAddress() << ", $t" << left.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareNotEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(ExpressionType::BOOLEAN);
    instructionBuffer_ << "sne \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(ExpressionType::BOOLEAN);
    instructionBuffer_ << "seq \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Or(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(ExpressionType::BOOLEAN);
    instructionBuffer_ << "or  \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::And(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(ExpressionType::BOOLEAN);
    instructionBuffer_ << "and \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

void Encoder::StartMain() {
    instructionBuffer_ << "main:" << std::endl;
}

void Encoder::EndProgram() {
    printOutStrings(out_, strings_);
    printOutInstructions(instructionBuffer_, out_);
    out_ << "li  \t$v0, 10" << std::endl;
    out_ << "syscall" << std::endl;
}

void Encoder::SaveRegisterToStack(unsigned int registerNumber, unsigned int variableOffset) {
    instructionBuffer_ << "sw  \t$t" << registerNumber << ", " << variableOffset << "($sp)" << std::endl;
}

void Encoder::RestoreRegisterFromStack(unsigned int registerNumber, unsigned int variableOffset) {
    instructionBuffer_ << "lw  \t$t" << registerNumber << ", " << variableOffset << "($sp)" << std::endl;
}

void Encoder::Assign(Variable& variable, ExpressionInRegister* reg) {
    instructionBuffer_ << "sw  \t$t" << reg->GetAddress() << ", " << getAddressFrom(variable) << std::endl;
}

void Encoder::Write(IParameter* value) {
    if (value->IsString()) {
        instructionBuffer_ << "li  \t$v0, 4" << std::endl;
        instructionBuffer_ << "la  \t$a0, str" << strings_.size() << std::endl;
        strings_.push_back(((StringLiteral*)value)->GetValue());
    }
    else {
        auto v = (Variable*)value;
        auto sysCallNumber = getWriteCallNumberFrom(v->GetType());
        instructionBuffer_ << "li  \t$v0, " << sysCallNumber << std::endl;
        instructionBuffer_ << "lw  \t$a0, " << v->GetOffset() << '(' << getPointerFrom(v->GetPointerType()) << ')' << std::endl;
    }
    instructionBuffer_ << "syscall" << std::endl;
}

int getWriteCallNumberFrom(ExpressionType type) {
    switch (type) {
        case NUMERIC: return 1;
        case CHARACTER: return 11;
        case STRING: return 4;
        case BOOLEAN: return 1;
        default: {
            throw;
        }
    }
}

ExpressionInRegister* Encoder::Read(ExpressionType type) {
    auto expr = new ExpressionInRegister(type);
    instructionBuffer_ << "li  \t$v0, ";
    auto sysCallNumber = getReadCallNumberFrom(type);
    instructionBuffer_ << sysCallNumber << std::endl;
    instructionBuffer_ << "syscall" << std::endl;
    instructionBuffer_ << "move\t$t" << expr->GetAddress() << ", $v0" << std::endl;
    return expr;
}

int getReadCallNumberFrom(ExpressionType type) {
    switch (type) {
        case NUMERIC: return 5;
        case CHARACTER: return 12;
        case BOOLEAN: return 5;
        default: throw;
    }
}

ExpressionInRegister* Encoder::LoadImmediate(Literal* literal) {
    auto expression = new ExpressionInRegister(literal->GetType());
    instructionBuffer_ << "li  \t$t" << expression->GetAddress() << ", ";
    switch (literal->GetType()) {
        case NUMERIC: {
            instructionBuffer_ << ((NumericLiteral*)literal)->GetValue();
            break;
        }
        case CHARACTER: {
            instructionBuffer_ << +((CharacterLiteral*)literal)->GetValue();
            break;
        }
        case STRING: {
            throw;
        }
        case BOOLEAN: {
            instructionBuffer_ << ((BooleanLiteral*)literal)->GetValue();
            break;
        }
        case USER_DEFINED:throw;
    }
    instructionBuffer_ << std::endl;
    return expression;
}

ExpressionInRegister* Encoder::LoadFrom(Variable* variable) {
    auto reg = new ExpressionInRegister(variable->GetType());
    if (variable->IsReference()) {
        auto param = (Parameter*)variable;
        instructionBuffer_ << "la  \t, $t" << reg->GetAddress() << ", " << param->GetOffset() << "($fp)" << std::endl;
        instructionBuffer_ << "lw  \t, $t" << reg->GetAddress() << "0($t" << reg->GetAddress() << ')' << std::endl;
    }
    else {
        instructionBuffer_ << "lw  \t$t" << reg->GetAddress() << ", " << getAddressFrom(*variable) << std::endl;
    }
    return reg;
}

std::string getAddressFrom(Variable& variable) {
    std::stringstream ss;
    ss << variable.GetOffset() << '(' << getPointerFrom(variable.GetPointerType()) << ')';
    return ss.str();
}

std::string getPointerFrom(PointerType pointerType) {
    switch (pointerType) {
        case Global: return "$gp";
        case Frame: return "$fp";
        case Stack: return "$sp";
        default: throw;
    }
}

void printOutStrings(std::ostream& out, std::vector<std::string*>& strings) {
    out << ".data" << std::endl;
    auto index = 0u;
    for (auto string : strings) {
        out << "str" << index++ << ":\t\t.asciiz\t\t" << *string << std::endl;
    }
}

void printOutInstructions(std::stringstream& instructions, std::ostream& out) {
    out << ".text" << std::endl;
    out << ".global main" << std::endl;
    out << instructions.str();
    std::flush(out);
}

void Encoder::Start(WhileStatement& whileStatement) {
    instructionBuffer_ << "whileStart" << whileStatement.GetNumber() << ':' << std::endl;
}

void Encoder::Test(WhileStatement& whileStatement, ExpressionInRegister& condition) {
    if (condition.GetType() != ExpressionType::BOOLEAN) throw;
    instructionBuffer_ << "beq \t$t" << condition.GetAddress() << ", $zero, whileEnd" << whileStatement.GetNumber() << std::endl;
}

void Encoder::End(WhileStatement& whileStatement) {
    instructionBuffer_ << "j   \twhileStart" << whileStatement.GetNumber() << std::endl;
    instructionBuffer_ << "whileEnd" << whileStatement.GetNumber() << ':' << std::endl;
}

void Encoder::Start(RepeatStatement& repeatStatement) {
    instructionBuffer_ << "repeat" << repeatStatement.GetNumber() << ':' << std::endl;
}

void Encoder::Test(RepeatStatement& repeatStatement, ExpressionInRegister& condition) {
    if (condition.GetType() != ExpressionType::BOOLEAN) throw;
    instructionBuffer_ << "bne \t$t" << condition.GetAddress() << ", $zero, repeat" << repeatStatement.GetNumber() << std::endl;
}

void Encoder::Test(IfChain& ifChain, ExpressionInRegister& condition) {
    if (condition.GetType() != ExpressionType::BOOLEAN) throw;
    instructionBuffer_ << "beq \t$t" << condition.GetAddress() << ", $zero, ";
    instructionBuffer_ << "if" << ifChain.GetIfNumber() << "Else" << ifChain.GetElseNumber();
    instructionBuffer_ << std::endl;
}

void Encoder::Exit(IfChain& ifChain) {
    instructionBuffer_ << "j   \tifEnd" << ifChain.GetIfNumber() << std::endl;
    instructionBuffer_ << "if" << ifChain.GetIfNumber() << "Else" << ifChain.GetElseNumber() << ':';
    instructionBuffer_ << std::endl;
}

void Encoder::PrintElseLabelFor(IfChain& ifChain) {
    instructionBuffer_ << "if" << ifChain.GetIfNumber() << "Else" << ifChain.GetElseNumber() << ':';
    instructionBuffer_ << std::endl;
}

void Encoder::End(IfChain& ifChain) {
    instructionBuffer_ << "ifEnd" << ifChain.GetIfNumber() << ':' << std::endl;
}

void Encoder::Start(FunctionDefinition* function) {
    instructionBuffer_ << function->GetFunctionName() << "Body:" << std::endl;
}

void Encoder::StartEpilogueFor(FunctionDefinition* functionDefinition) {
    instructionBuffer_ << functionDefinition->GetFunctionName() << "Epilogue:" << std::endl;
}

void Encoder::StartPrologueFor(FunctionDefinition* function) {
    instructionBuffer_<< "lw  \t$ra, 0($sp)" << std::endl;
    instructionBuffer_ << "jr  \t$ra" << std::endl;
    instructionBuffer_ << function->GetFunctionName() << "Entry:" << std::endl;
    instructionBuffer_ << "sw  \t$ra, 0$(sp)" << std::endl;
}

void Encoder::EndPrologueFor(FunctionDefinition* function) {
    instructionBuffer_ << "j   \t" << function->GetFunctionName() << "Body" << std::endl;
}

void Encoder::IncrementStackPointerBy(int offset) {
    instructionBuffer_ << "addi\t$sp, $sp, " << offset << std::endl;
}

void Encoder::Return(FunctionDefinition* functionDefinition) {
    instructionBuffer_ << "j   " << functionDefinition->GetFunctionName() << "Epilogue" << std::endl;
}

void Encoder::Return(IExpression& expression, FunctionDefinition* functionDefinition) {
    if (expression.IsConstant()) {
        returnConstant((Literal&)expression);
    }
    else {
        returnExpression((ExpressionInRegister&)expression);
    }
    Return(functionDefinition);
}

void Encoder::returnExpression(ExpressionInRegister& expression) {
    instructionBuffer_ << "lw  \t$v0, $t" << expression.GetAddress() << std::endl;
}

void Encoder::returnConstant(Literal& literal) {
    switch (literal.GetType()) {
        case NUMERIC: {
            instructionBuffer_ << "li  \t$v0, " << ((NumericLiteral&)literal).GetValue() << std::endl;
            break;
        }
        case CHARACTER:{
            instructionBuffer_ << "li  \t$v0, " << ((CharacterLiteral&)literal).GetValue() << std::endl;
            break;
        }
        case BOOLEAN:{
            instructionBuffer_ << "li  \t$v0, " << ((BooleanLiteral&)literal).GetValue() << std::endl;
            break;
        }
        default: throw;
    }
}


Encoder* Encoder::instance_ = nullptr;
