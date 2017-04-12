//
// Created by floris on 4/11/17.
//

#ifndef COMPILER_RECORD_TYPE_H
#define COMPILER_RECORD_TYPE_H


#include <map>
#include "Type.h"
#include "IdentifierList.h"

struct Property {
    unsigned int Offset;
    Type* TheType;
};

class RecordType : public Type {
private:
    std::map<std::string, Type*> subTypes_;
protected:
    TypeType GetType() { return RECORD; }
    bool haveSameStructure(Type& otherType);
public:
    RecordType(std::vector<IdentifierList*>& identifierList);
    unsigned int GetSize() { throw; }
    bool IsPrimitive() { return false; }

};


#endif //COMPILER_RECORD_TYPE_H
