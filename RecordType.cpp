//
// Created by floris on 4/11/17.
//

#include "RecordType.h"

RecordType::RecordType(std::vector<IdentifierList*>& identifierList) {
    for (auto identifiers : identifierList) {
        addIdentifiersByType(*identifiers);
    }
}

void RecordType::addIdentifiersByType(IdentifierList& identifiers) {
    auto& type = identifiers.TheType;
    for (auto id : identifiers.Identifiers) {
            addIdentifier(type, *id);
        }
}

void RecordType::addIdentifier(Type& type, std::string& id) {
    subTypes_[id] = new Field(size_, type);
    subTypesInOrder_.push_back(&type);
    size_ += type.GetSize();
}

bool RecordType::haveSameStructure(Type& otherType) {
    if (otherType.GetType() != RECORD) return false;
    auto otherRecord = (RecordType&)otherType;
    if (subTypesInOrder_.size() != otherRecord.subTypesInOrder_.size()) return false;
    for (auto index = 0; index < subTypesInOrder_.size(); index++) {
        if (*subTypesInOrder_[index] != *otherRecord.subTypesInOrder_[index]) return false;
    }
    return true;
}

Field& RecordType::GetFieldFor(std::string& fieldName) {
    auto field = subTypes_[fieldName];
    if (field == nullptr) throw;
    return *field;
}
