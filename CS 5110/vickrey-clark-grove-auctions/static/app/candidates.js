export default function (
    names
) {

return function Candidates() {

    const self = {};

    const candidates = [];

    self[Symbol.iterator] = function* () {
        yield* candidates;
    };

    self.add = function (name) {
        const newCandidate = {
            id: ids.next().value,
            name: name
        };
        candidates.push(newCandidate);
        return newCandidate;
    };

    self.addRandom = function (count) {
        const newCandidates = _generateRandom(count);
        candidates.push(...newCandidates);
        return newCandidates;
    };

    self.toArray = () => Array.from( candidates );

    const _generateRandom = function* (count) {
        for (let i = 0; i < count; i++)
            yield _createRandomCandidate();
    };

    const _createRandomCandidate = function () {
        return {
            id: ids.next().value,
            name: names.random()
        }
    };

    self.count = () => candidates.length;

    const ids = function* () {
        let nextId = 1;
        while (true) {
            yield nextId++;
        }
    }();

    return self;

}

}