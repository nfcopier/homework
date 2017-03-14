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
}

ExpressionInRegister& getRegisterFor(IExpression* expr) {
    if (!expr->IsConstant()) return (ExpressionInRegister&)*expr;
    auto& result = *Encoder::Instance().LoadImmediate((Literal*)expr);
    delete expr;
    return result;
}


StatementController* StatementController::instance_ = nullptr;

#pragma clang diagnostic pop