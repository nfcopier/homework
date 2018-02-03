//
// Created by floris on 4/11/17.
//

#ifndef COMPILER_RECORD_TYPE_H
#define COMPILER_RECORD_TYPE_H


#include <map>
#include "Type.h"
#include "IdentifierList.h"

class RecordType : public Type {
private:
    std::map<std::string, Field*> subTypes_;
    std::vector<Type*> subTypesInOrder_;
    unsigned int size_;
    void addIdentifier(Type& type, std::string& id);
    void addIdentifiersByType(IdentifierList& identifiers);
protected:
    TypeType GetType() { return RECORD; }
    bool haveSameStructure(Type& otherType);
public:
    RecordType(std::vector<IdentifierList*>& identifierList);
    unsigned int GetSize() { return size_; }
    bool IsPrimitive() { return false; }
    Field& GetFieldFor(std::string& fieldName);
};


#endif //COMPILER_RECORD_TYPE_H
