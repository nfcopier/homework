//
// Created by floris on 3/14/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"

#include "StatementController.h"
#include "ParserInterface.h"


ExpressionInRegister& getRegisterFor(IExpression* expr);

StatementController& StatementController::Instance() {
    if (instance_ == nullptr) instance_ = new StatementController();
    return *instance_;
}

WhileStatement* StatementController::Start(WhileStatement* whileStatement) {
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

IExpression* StatementController::DoComparisonFor(ForLoop* forLoop) {
    auto rangeVariable = forLoop->GetRangeVariable();
    auto stopVariable = forLoop->GetStopVariable();

    auto rangeExpr = ParserInterface::Instance().GetExpressionFrom(rangeVariable);
    auto stopExpr = ParserInterface::Instance().GetExpressionFrom(stopVariable);

    switch (forLoop->GetRangeType()) {
        case To: return ParserInterface::Instance().CompareGreaterOrEqual( stopExpr, rangeExpr );
        case DownTo: return ParserInterface::Instance().CompareGreaterOrEqual( rangeExpr, stopExpr );
        default: throw;
    }
}

IExpression* update(IExpression* rangeExpr, IExpression* numericLiteral, RangeType rangeType) {
    switch (rangeType) {
        case To: return ParserInterface::Instance().Add(rangeExpr, numericLiteral);
        case DownTo: return ParserInterface::Instance().Subtract(rangeExpr, numericLiteral);
        default: throw;
    }
}

void StatementController::UpdateRangeVariableFor(ForLoop* forLoop) {
    auto rangeVariable = forLoop->GetRangeVariable();
    auto rangeExpr = ParserInterface::Instance().GetExpressionFrom(rangeVariable);
    auto numericLiteral = new NumericLiteral(1);
    auto result = update(rangeExpr, numericLiteral, forLoop->GetRangeType());
    ParserInterface::Instance().Assign(rangeVariable, result);

}


StatementController* StatementController::instance_ = nullptr;

#pragma clang diagnostic pop