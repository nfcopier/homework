//
// Created by floris on 2/22/17.
//

#include "Encoder.h"

Encoder& Encoder::Instance() {
    if (instance_ == nullptr) instance_ = new Encoder();
    return *instance_;
}

ExpressionInRegister* Encoder::Modulo(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(NUMERIC);
    out_ << "div \t$t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    out_ << "mfhi\t$t" << outExpr->GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Divide(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(NUMERIC);
    out_ << "div \t$t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    out_ << "mflo\t$t" << outExpr->GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Multiply(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(NUMERIC);
    out_ << "mult\t$t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    out_ << "mflo\t$t" << outExpr->GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Subtract(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(NUMERIC);
    out_ << "sub \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::Add(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(NUMERIC);
    out_ << "add \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::CompareGreater(ExpressionInRegister& left, ExpressionInRegister& right) {
    //out_ << "add\t$t" << 0 << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return new ExpressionInRegister(BOOLEAN);
}

ExpressionInRegister* Encoder::CompareGreaterOrEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    //out_ << "add\t$t" << 0 << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return new ExpressionInRegister(BOOLEAN);
}

ExpressionInRegister* Encoder::CompareNotEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    //out_ << "add\t$t" << 0 << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return new ExpressionInRegister(BOOLEAN);
}

ExpressionInRegister* Encoder::CompareEqual(ExpressionInRegister& left, ExpressionInRegister& right) {
    //out_ << "add\t$t" << 0 << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return new ExpressionInRegister(BOOLEAN);
}

ExpressionInRegister* Encoder::Or(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(BOOLEAN);
    out_ << "or \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

ExpressionInRegister* Encoder::And(ExpressionInRegister& left, ExpressionInRegister& right) {
    auto outExpr = new ExpressionInRegister(BOOLEAN);
    out_ << "and \t$t" << outExpr->GetAddress() << ", $t" << left.GetAddress() << ", $t" << right.GetAddress() << std::endl;
    return outExpr;
}

void Encoder::EndProgram() {
    out_ << "li  \t$v0, 10" << std::endl;
    out_ << "syscall" << std::endl;
}

void Encoder::Assign(Variable& variable, ExpressionInRegister* reg) {
    out_ << "sw  \t$t" << reg->GetAddress() << ", $t" << variable.GetAddress() << std::endl;
}

void Encoder::Write(IExpression* value) {
    ExpressionInRegister* v;
    if (value->IsConstant()) {
        v = new ExpressionInRegister((Literal*)value);
    } else {
        v = (ExpressionInRegister*)&value;
    }
    auto sysCallNumber = GetSystemCallNumberFrom(v->GetType());
    out_ << "li  \t$v0, " << sysCallNumber << std::endl;
    out_ << "mv  \t$a0, $t" << v->GetAddress() << std::endl;
    out_ << "syscall" << std::endl;
}

int Encoder::GetSystemCallNumberFrom(ExpressionType type) {
    switch (type) {
        case NUMERIC: return 1;
        case CHARACTER: return 11;
        case STRING: return 4;
        case BOOLEAN: return 1;
        default: throw;
    }
}

ExpressionInRegister* Encoder::Read(ExpressionType type) {
    auto expr = new ExpressionInRegister(type);
    out_ << "li  \t$v0, ";
    switch (type) {
        case NUMERIC: out_ << "5" << std::endl;
        case CHARACTER: out_ << "12" << std::endl;
        case BOOLEAN: out_ << "5" << std::endl;
        case STRING: throw;
        case USER_DEFINED: throw;
    }
    out_ << "mv  \t$v0, $t" << expr->GetAddress() << std::endl;
    return expr;
}

Encoder* Encoder::instance_ = nullptr;
