//
// Created by floris on 2/22/17.
//

#include "Encoder.h"
#include "NumericLiteral.h"
#include "CharacterLiteral.h"
#include "BooleanLiteral.h"
#include "StringLiteral.h"
#include "Parameter.h"

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
    auto outExpr = new ExpressionInRegister(Type::BOOLEAN);
    instructionBuffer_ << "slt \t$t" << outExpr->GetAddress() << ", $t" << right.GetAddress() << ", $t" << left.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareGreaterOrEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(Type::BOOLEAN);
    instructionBuffer_ << "sle \t$t" << outExpr->GetAddress() << ", $t" << right.GetAddress() << ", $t" << left.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareNotEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(Type::BOOLEAN);
    instructionBuffer_ << "sne \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(Type::BOOLEAN);
    instructionBuffer_ << "seq \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Or(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(Type::BOOLEAN);
    instructionBuffer_ << "or  \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::And(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(Type::BOOLEAN);
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
    if (variable.GetType().IsPrimitive()) {
        instructionBuffer_ << "sw  \t$t" << reg->GetAddress() << ", " << getAddressFrom(variable) << std::endl;
        return;
    }
    auto tempReg = ExpressionInRegister(Type::NUMERIC);
    for (auto offset = 0u; offset < variable.GetSize(); offset += 4) {
        instructionBuffer_ << "lw  \t$t" << tempReg.GetAddress() << ", " << offset << "($t" << reg->GetAddress() << ')' << std::endl;
        instructionBuffer_ << "sw \t$t" << tempReg.GetAddress() << ", " << variable.GetOffset() + offset << '(' << getPointerFrom(variable) << ')' << std::endl;
    }
}

void Encoder::Write(IParameter* value) {
    if (!value->GetType().IsPrimitive()) throw;
    auto primitiveType = (PrimitiveType&)(value->GetType());
    auto sysCallNumber = primitiveType.GetWriteCallNumber();
    instructionBuffer_ << "li  \t$v0, " << sysCallNumber << std::endl;
    if (value->GetType() == Type::STRING) {
        instructionBuffer_ << "la  \t$a0, str" << strings_.size() << std::endl;
        strings_.push_back(((StringLiteral*)value)->GetValue());
    }
    else if (value->IsVariable()) {
        instructionBuffer_ << "lw  \t$a0, " << ((Variable*)value)->GetOffset() << '(' << getPointerFrom(*(Variable*)value) << ')' << std::endl;
    }
    else {
        auto expr = (IExpression*)value;
        if (expr->IsConstant()) {
            expr = LoadImmediate((Literal*) expr);
            instructionBuffer_ << "move\t$a0, $t" << ((ExpressionInRegister*) expr)->GetAddress() << std::endl;
            delete expr;
        } else {
            instructionBuffer_ << "move\t$a0, $t" << ((ExpressionInRegister*) expr)->GetAddress() << std::endl;
        }
    }
    instructionBuffer_ << "syscall" << std::endl;
}

ExpressionInRegister* Encoder::Read(Type& type) {
    if (!type.IsPrimitive()) throw;
    auto primitiveType = (PrimitiveType&)type;
    auto expr = new ExpressionInRegister(primitiveType);
    instructionBuffer_ << "li  \t$v0, ";
    auto sysCallNumber = primitiveType.GetReadCallNumber();
    instructionBuffer_ << sysCallNumber << std::endl;
    instructionBuffer_ << "syscall" << std::endl;
    instructionBuffer_ << "move\t$t" << expr->GetAddress() << ", $v0" << std::endl;
    return expr;
}

ExpressionInRegister* Encoder::LoadImmediate(Literal* literal) {
    auto expression = new ExpressionInRegister(literal->GetType());
    instructionBuffer_ << "li  \t$t" << expression->GetAddress() << ", ";
    if (literal->GetType() == Type::NUMERIC) {
        instructionBuffer_ << ((NumericLiteral*)literal)->GetValue();
    } else if (literal->GetType() == Type::CHARACTER) {
        instructionBuffer_ << +((CharacterLiteral*)literal)->GetValue();
    } else if (literal->GetType() == Type::BOOLEAN) {
        instructionBuffer_ << ((BooleanLiteral*)literal)->GetValue();
    } else {
        throw;
    }
    instructionBuffer_ << std::endl;
    return expression;
}

ExpressionInRegister* Encoder::LoadFrom(Variable* variable) {
    auto reg = new ExpressionInRegister(variable->GetType());
    if (variable->IsReference()) {
        auto param = (Parameter*)variable;
        instructionBuffer_ << "lw  \t$t" << reg->GetAddress() << ", " << param->GetOffset() << "($fp)" << std::endl;
        instructionBuffer_ << "lw  \t$t" << reg->GetAddress() << ", 0($t" << reg->GetAddress() << ')' << std::endl;
    }
    else {
        auto address = getAddressFrom(*variable);
        instructionBuffer_ << "lw  \t$t" << reg->GetAddress() << ", " << address << std::endl;
    }
    return reg;
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
    out << "j   \tmain" << std::endl;
    out << instructions.str();
    std::flush(out);
}

void Encoder::Start(WhileStatement& whileStatement) {
    instructionBuffer_ << "whileStart" << whileStatement.GetNumber() << ':' << std::endl;
}

void Encoder::Test(WhileStatement& whileStatement, ExpressionInRegister& condition) {
    if (condition.GetType() != Type::BOOLEAN) throw;
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
    if (condition.GetType() != Type::BOOLEAN) throw;
    instructionBuffer_ << "beq \t$t" << condition.GetAddress() << ", $zero, repeat" << repeatStatement.GetNumber() << std::endl;
}

void Encoder::Test(IfChain& ifChain, ExpressionInRegister& condition) {
    if (condition.GetType() != Type::BOOLEAN) throw;
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
    instructionBuffer_<< "lw  \t$ra, -4($sp)" << std::endl;
    instructionBuffer_ << "jr  \t$ra" << std::endl;
    instructionBuffer_ << function->GetFunctionName() << "Entry:" << std::endl;
    instructionBuffer_ << "sw  \t$ra, -4($sp)" << std::endl;
}

void Encoder::EndPrologueFor(FunctionDefinition* function) {
    instructionBuffer_ << "j   \t" << function->GetFunctionName() << "Body" << std::endl;
}

void Encoder::IncrementStackPointerBy(int offset) {
    instructionBuffer_ << "addi\t$sp, $sp, " << offset << std::endl;
}

void Encoder::MoveFramePointerBy(int offset) {
    instructionBuffer_ << "addi\t$fp, $sp, " << offset << std::endl;
}

void Encoder::ReturnFrom(FunctionDefinition* functionDefinition) {
    instructionBuffer_ << "j   \t" << functionDefinition->GetFunctionName() << "Epilogue" << std::endl;
}

void Encoder::Return(IParameter& returnValue, FunctionDefinition* functionDefinition) {
    if (returnValue.IsVariable()) {
        returnVariable((Variable&)returnValue);
    }
    else {
        auto expr = (IExpression*)(&returnValue);
        if (expr->IsConstant()) {
            returnConstant((Literal&) returnValue);
        } else {
            returnExpression((ExpressionInRegister&)(*expr));
        }
    }
    ReturnFrom(functionDefinition);
}

void Encoder::returnVariable(Variable& variable) {
    instructionBuffer_ << "la  \t$v0, " << variable.GetOffset() << "($fp)" << std::endl;
}

void Encoder::returnConstant(Literal& literal) {
    if (literal.GetType() == Type::NUMERIC) {
        instructionBuffer_ << "li  \t$v0, " << ((NumericLiteral&)literal).GetValue() << std::endl;
    } else if (literal.GetType() == Type::CHARACTER) {
        instructionBuffer_ << "li  \t$v0, " << ((CharacterLiteral&)literal).GetValue() << std::endl;
    } else if (literal.GetType() == Type::BOOLEAN) {
        instructionBuffer_ << "li  \t$v0, " << ((BooleanLiteral&)literal).GetValue() << std::endl;
    } else {
        throw;
    }
}

void Encoder::returnExpression(ExpressionInRegister& expression) {
    instructionBuffer_ << "move\t$v0, $t" << expression.GetAddress() << std::endl;
}

void Encoder::CopyAddress(Variable& source, int destOffset) {
    auto reg = ExpressionInRegister(Type::NUMERIC);
    if (source.IsReference()) {
        instructionBuffer_ << "lw  \t$t" << reg.GetAddress() << ", " << source.GetOffset() << '(' << getPointerFrom(source) << ')' << std::endl;
    } else {
        instructionBuffer_ << "la  \t$t" << reg.GetAddress() << ", " << source.GetOffset() << '(' << getPointerFrom(source) << ')' << std::endl;
    }
    instructionBuffer_ << "sw  \t$t" << reg.GetAddress() << ", " << destOffset << "($sp)" << std::endl;
}

void Encoder::CopyValue(Variable& source, int destOffset) {
    auto reg = ExpressionInRegister(Type::NUMERIC);
    int baseOffset;
    std::string pointer;
    if (source.IsReference()) {
        instructionBuffer_ << "lw  \t$t" << reg.GetAddress() << ", " << source.GetOffset() << "($fp)" << std::endl;
        std::stringstream ss;
        ss << "$t" << reg.GetAddress();
        pointer = ss.str();
        baseOffset = 0;
    } else {
        pointer = getPointerFrom(source);
        baseOffset = source.GetOffset();
    }
    for (auto offset = 0; offset < source.GetSize(); offset += 4) {
        instructionBuffer_ << "lw  \t$t" << reg.GetAddress() << ", " << baseOffset + offset << '(' << pointer << ')' << std::endl;
        instructionBuffer_ << "sw  \t$t" << reg.GetAddress() << ", " << destOffset + offset << "($sp)" << std::endl;
    }
}

void Encoder::CopyExpression(ExpressionInRegister& providedParam, int destOffset) {
    instructionBuffer_ << "sw  \t$t" << providedParam.GetAddress() << ", " << destOffset << "($sp)" << std::endl;
}

std::string Encoder::getAddressFrom(Variable& variable) {
    std::stringstream ss;
    if (variable.IsReference()) {
        auto reg = ExpressionInRegister(Type::NUMERIC);
        instructionBuffer_ << "lw  \t$t" << reg.GetAddress() << ", " << variable.GetOffset() << "($fp)" << std::endl;
        ss << "0($t" << reg.GetAddress() << ')';
    } else {
        ss << variable.GetOffset() << '(' << getPointerFrom(variable) << ')';
    }
    return ss.str();
}

std::string Encoder::getPointerFrom(Variable& variable) {
    switch (variable.GetPointerType()) {
        case Global: return "$gp";
        case Frame: return "$fp";
        case Stack: return "$sp";
        default: throw;
    }
}

void Encoder::Call(std::string& functionName) {
    instructionBuffer_ << "jal \t" << functionName << "Entry" << std::endl;
}

void Encoder::LoadReturnValueInto(ExpressionInRegister& reg) {
    instructionBuffer_ << "move\t$t" << reg.GetAddress() << ", $v0" << std::endl;
}

void Encoder::Succeed(ExpressionInRegister& expression) {
    if (expression.GetType() == Type::BOOLEAN) {
        instructionBuffer_ << "seq \t$t" << expression.GetAddress() << ", $zero, $t" << expression.GetAddress() << std::endl;
    } else {
        instructionBuffer_ << "addi\t$t" << expression.GetAddress() << ", $t" << expression.GetAddress() << ", 1" << std::endl;
    }

}

void Encoder::Precede(ExpressionInRegister& expression) {
    if (expression.GetType() == Type::BOOLEAN) {
        instructionBuffer_ << "seq \t$t" << expression.GetAddress() << ", $zero, $t" << expression.GetAddress() << std::endl;
    } else {
        instructionBuffer_ << "addi\t$t" << expression.GetAddress() << ", $t" << expression.GetAddress() << ", -1" << std::endl;
    }

}

void Encoder::Negate(ExpressionInRegister& expression) {
    instructionBuffer_ << "neg \t$t" << expression.GetAddress() << ", $t" << expression.GetAddress() << std::endl;
}

void Encoder::Copy(Variable& destination, Variable& source) {
    auto reg = ExpressionInRegister(Type::NUMERIC);
    for (auto offset = 0u; offset < destination.GetSize(); offset += 4) {
        instructionBuffer_ << "lw  \t$t" << reg.GetAddress() << ", " << source.GetOffset() + offset << '(' << getPointerFrom(source) << ')' << std::endl;
        instructionBuffer_ << "sw  \t$t" << reg.GetAddress() << ", " << destination.GetOffset() + offset << '(' << getPointerFrom(destination) << ')' << std::endl;
    }
}


Encoder* Encoder::instance_ = nullptr;
