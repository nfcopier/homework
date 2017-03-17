//
// Created by floris on 3/15/17.
//

#ifndef COMPILER_IFCHAIN_H
#define COMPILER_IFCHAIN_H


class IfChain {
private:
    static int ifCount_;
    int ifLabelNumber_;
    int elseLabelNumber_;
public:
    IfChain() : ifLabelNumber_(ifCount_++) {}
    int GetIfNumber() { return ifLabelNumber_; }
    void IncrementElse() { elseLabelNumber_++; }
    int GetElseNumber() { return elseLabelNumber_; }
};


#endif //COMPILER_IFCHAIN_H
