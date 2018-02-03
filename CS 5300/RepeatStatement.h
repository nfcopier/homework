//
// Created by floris on 3/14/17.
//

#ifndef COMPILER_REPEAT_STATEMENT_H
#define COMPILER_REPEAT_STATEMENT_H


class RepeatStatement {
private:
    static int labelCount_;
    int labelNumber_;
public:
    RepeatStatement() : labelNumber_(labelCount_++) {}
    int GetNumber() { return labelNumber_; }
};


#endif //COMPILER_REPEAT_STATEMENT_H
