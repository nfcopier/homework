const Node = function(thisIndex, thisValue, left, right) {

    const self = {};

    self[Symbol.iterator] = function* () {
        yield* left;
        yield {index: thisIndex, value: thisValue};
        yield* right;
    };

    self.mergeLeft = function (other) {
        const newRight = right.mergeLeft(other);
        return Node(thisIndex, thisValue, left, newRight);
    };

    self.remove = function (victimIndex) {
        if (victimIndex < thisIndex)
            return _removeLessThan(victimIndex);
        else if (victimIndex === thisIndex)
            return _removeSelf();
        else
            return _removeGreaterThan(victimIndex);
    };

    const _removeLessThan = function (victimIndex) {
        const newRight = right.remove(victimIndex);
        return Node(thisIndex, thisValue, left, newRight);
    };

    const _removeSelf = function () {
        return left.mergeLeft(right);
    };

    const _removeGreaterThan = function (victimIndex) {
        const newLeft = left.remove(victimIndex);
        return Node(thisIndex, thisValue, newLeft, right);
    };

    self.insert = function (newIndex, newValue) {
        if (newIndex < thisIndex)
            return _insertLessThan(newIndex, newValue);
        else if (newIndex === thisIndex)
            return _replaceWith(newValue);
        else
            return _insertGreaterThan(newIndex, newValue);
    };

    const _insertLessThan = function (newIndex, newValue) {
        const newRight = right.insert(newIndex, newValue);
        return Node(thisIndex, thisValue, left, newRight)
    };

    const _replaceWith = function (newValue) {
        return Node(thisIndex, newValue, left, right)
    };

    const _insertGreaterThan = function (newIndex, newValue) {
        const newLeft = left.insert(newIndex, newValue);
        return Node(thisIndex, thisValue, newLeft, right)
    };

    return self;

};

const EmptyNode = function () {

    const self = {};

    self[Symbol.iterator] = function* () {};

    self.remove = function () { return self; };

    self.insert = function (index, value) {
        return Node(index, value, EmptyNode(), EmptyNode());
    };

    self.mergeLeft = function (other) { return other; };

    return self;

};

export default function () {

    const self = {};

    let _head = EmptyNode();

    self[Symbol.iterator] = function* () {
        yield* _head;
    };

    self.insert = function (index, value) {
        _head = _head.insert(index, value);
    };

    return self;

}