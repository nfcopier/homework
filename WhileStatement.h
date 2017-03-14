//
// Created by floris on 3/14/17.
//

#ifndef COMPILER_WHILE_STATEMENT_H
#define COMPILER_WHILE_STATEMENT_H


class WhileStatement {
private:
    static int labelCount_;
    int whileNumber;
public:
    WhileStatement() : whileNumber(labelCount_++) {

    }
    int GetNumber() { return whileNumber; }
};


#endif //COMPILER_WHILE_STATEMENT_H
