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


class StatementController {
private:

    static StatementController* instance_;

public:

    static StatementController& Instance();
    WhileStatement* StartWhile();
    void Test(WhileStatement* whileStatement, IExpression* condition);
    void End(WhileStatement* whileStatement);
    RepeatStatement* StartRepeat();
    void Test(RepeatStatement*repeatStatement, IExpression* condition);
};


#endif //COMPILER_STATEMENTCONTROLLER_H

#pragma clang diagnostic pop