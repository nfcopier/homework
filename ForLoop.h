//
// Created by floris on 3/17/17.
//

#ifndef COMPILER_FOR_LOOP_H
#define COMPILER_FOR_LOOP_H


#include "WhileStatement.h"
#include "Variable.h"

enum RangeType {
    To,
    DownTo
};

class ForLoop : public WhileStatement {
private:
    Variable* stopVariable_;
    RangeType rangeType_;
    Variable* rangeVariable_;
public:
    ForLoop() :
            WhileStatement(),
            stopVariable_(new Variable(Type::NUMERIC, PointerType::Global))
    {}
    Variable* GetStopVariable() { return stopVariable_; }
    void Set(RangeType rangeType) { rangeType_ = rangeType; }
    RangeType GetRangeType() { return rangeType_; }
    void Set( Variable* rangeVariable ) { rangeVariable_ = rangeVariable; }
    Variable* GetRangeVariable() { return rangeVariable_; }
    ~ForLoop() { delete stopVariable_; }
};


#endif //COMPILER_FOR_LOOP_H
