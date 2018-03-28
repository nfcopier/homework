export default function (
    names,
    BinaryTree
) {

return function Votes(candidates) {

    const self = {};

    let votes = [];

    self[Symbol.iterator] = function* () {
        yield* votes;
    };

    self.add = function (name, choices) {
        const vote = _createVoteFrom(name, choices);
        votes.push(vote);
    };

    const _createVoteFrom = function (name, choices) {
        const choiceTree = BinaryTree();
        for (let choice of choices) {
            choiceTree.insert(choice);
        }
        return {
            id        : ids.next().value,
            name      : name,
            choices   : choiceTree,
            isDisabled: false
        };
    };

    self.addRandom = function (count) {
        for (let vote of _generateRandomVotes(count))
            votes.push( vote );
    };

    const _generateRandomVotes = function* (count) {
        for (let i = 0; i < count; i++)
            yield _createRandomVote();
    };

    const _createRandomVote = function () {
        return {
            id        : ids.next().value,
            name      : names.random(),
            choices   : _generateRandomChoices(),
            isDisabled: false
        }
    };

    const _generateRandomChoices = function () {
        const choiceTree = BinaryTree();
        for (let candidate of candidates) {
            const rank = Math.random();
            choiceTree.insert(rank, candidate.id);
        }
        return choiceTree;
    };

    self.toArray = () => Array.from( self );

    const ids = function* () {
        let nextId = 1;
        while (true) {
            yield nextId++;
        }
    }();

    return self;

}

}