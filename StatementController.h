//
// Created by floris on 3/14/17.
//

#pragma clang diagnostic push
#pragma ide diagnostic ignored "OCUnusedGlobalDeclarationInspection"
#pragma ide diagnostic ignored "OCUnusedStructInspection"
#ifndef COMPILER_STATEMENT_CONTROLLER_H
#define COMPILER_STATEMENT_CONTROLLER_H

#include "WhileStatement.h"
#include "Encoder.h"
#include "RepeatStatement.h"
#include "IfChain.h"


class StatementController {
private:

    static StatementController* instance_;
    IfChain* currentIfChain;

public:

    static StatementController& Instance();
    WhileStatement* StartWhile();
    void Test(WhileStatement* whileStatement, IExpression* condition);
    void End(WhileStatement* whileStatement);
    RepeatStatement* StartRepeat();
    void Test(RepeatStatement* repeatStatement, IExpression* condition);
    void Test(IfChain* ifChain, IExpression* condition);
    void Set(IfChain* ifChain) { currentIfChain = ifChain; }
    void AddElseTo(IfChain* ifChain);
    IfChain* GetIfChain() { return currentIfChain; }
    void EndElseIn(IfChain* ifChain);
    void End(IfChain* ifChain);
};


#endif //COMPILER_STATEMENTCONTROLLER_H

#pragma clang diagnostic pop