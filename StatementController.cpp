//
// Created by floris on 3/14/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"

#include "StatementController.h"


ExpressionInRegister& getRegisterFor(IExpression* expr);

StatementController& StatementController::Instance() {
    if (instance_ == nullptr) instance_ = new StatementController();
    return *instance_;
}

WhileStatement* StatementController::StartWhile() {
    auto whileStatement = new WhileStatement();
    Encoder::Instance().Start(*whileStatement);
    return whileStatement;
}

void StatementController::Test(WhileStatement* whileStatement, IExpression* condition) {
    auto& reg = getRegisterFor(condition);
    Encoder::Instance().Test(*whileStatement, reg);
    delete condition;
}

void StatementController::End(WhileStatement* whileStatement) {
    Encoder::Instance().End(*whileStatement);
    delete whileStatement;
}

RepeatStatement* StatementController::StartRepeat() {
    auto statement = new RepeatStatement();
    Encoder::Instance().Start(*statement);
    return statement;
}

void StatementController::Test(RepeatStatement* repeatStatement, IExpression* condition) {
    auto& reg = getRegisterFor(condition);
    Encoder::Instance().Test(*repeatStatement, reg);
    delete repeatStatement;
    delete condition;
}

void StatementController::Test(IfChain* ifChain, IExpression* condition) {
    auto& reg = getRegisterFor(condition);
    Encoder::Instance().Test(*ifChain, reg);
    delete condition;
}

void StatementController::AddElseTo(IfChain* ifChain) {
    Encoder::Instance().Exit(*ifChain);
    ifChain->IncrementElse();
}

void StatementController::EndElseIn(IfChain* ifChain) {
    Encoder::Instance().PrintElseLabelFor(*ifChain);
}

void StatementController::End(IfChain* ifChain) {
    Encoder::Instance().End(*ifChain);
    delete ifChain;
}

ExpressionInRegister& getRegisterFor(IExpression* expr) {
    if (!expr->IsConstant()) return (ExpressionInRegister&)*expr;
    auto& result = *Encoder::Instance().LoadImmediate((Literal*)expr);
    return result;
}


StatementController* StatementController::instance_ = nullptr;

#pragma clang diagnostic pop