//
// Created by floris on 4/11/17.
//

#ifndef COMPILER_TYPE_H
#define COMPILER_TYPE_H


#include <string>

enum TypeType {
    PRIMITIVE,
    ARRAY,
    RECORD
};

class Type {
protected:
    virtual bool haveSameStructure(Type& otherType) = 0;
public:
    virtual TypeType GetType() = 0;
    virtual unsigned int GetSize() = 0;
    virtual bool IsPrimitive() = 0;
    bool operator == (Type& otherType) {
        return &otherType == this or haveSameStructure(otherType);
    };
    bool operator != (Type& otherType) {
        return &otherType != this and !haveSameStructure(otherType);
    };

    static Type& NUMERIC;
    static Type& CHARACTER;
    static Type& BOOLEAN;
    static Type& STRING;
};

class PrimitiveType : public Type {
private:
    unsigned int readCallNumber_;
    unsigned int writeCallNumber_;
protected:
    bool haveSameStructure(Type& otherType) { return false; }
public:
    PrimitiveType(unsigned int readCallNumber, unsigned int writeCallNumber) : readCallNumber_(readCallNumber), writeCallNumber_(writeCallNumber) {}
    TypeType GetType() { return PRIMITIVE; }
    unsigned int GetSize() { return 4; }
    bool IsPrimitive() { return true; }
    unsigned int GetReadCallNumber() { return  readCallNumber_; }
    unsigned int GetWriteCallNumber() { return writeCallNumber_; }
};

struct Field {
    Field(unsigned int offset, Type& type) : Offset(offset), TheType(type) {}
    unsigned int Offset;
    Type& TheType;
};


#endif //COMPILER_TYPE_H
