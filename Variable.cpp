//
// Created by floris on 2/22/17.
//


#include "Variable.h"

int Variable::currentGlobalOffset_ = 0;
int Variable::currentStackOffset_ = 0;
int Variable::currentFrameOffset_ = 0;

void Variable::doOffset() {
    if (pointerType_ == Global) {
        offset_ = currentGlobalOffset_;
        currentGlobalOffset_ += GetSize();
    } else if (pointerType_ == Stack){
        currentStackOffset_ -= GetSize();
        offset_ = currentStackOffset_;
    } else {
        currentFrameOffset_ -= GetSize();
        offset_ = currentFrameOffset_;
    }
}
