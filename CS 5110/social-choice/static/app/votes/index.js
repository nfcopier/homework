export default function (
    nameList,
    BinaryTree,
    Collection
) {

return function Votes(candidates) {

    const self = {};

    const votes = Collection();

    self.addRandom = function (count) {
        for (let vote of _generateRandomVotes(count))
            votes.add( vote );
    };

    const _generateRandomVotes = function* (count) {
        for (let i = 0; i < count; i++)
            yield _createRandomVote();
    };

    const _createRandomVote = function () {
        return {
            name: _generateRandomName(),
            choices: _generateRandomChoices(),
        }
    };

    const _generateRandomName = function () {
        const index = Math.floor(Math.random() * nameList.length);
        return nameList[index];
    };

    const _generateRandomChoices = function () {
        const choiceTree = BinaryTree();
        for (let candidate of candidates) {
            const rank = Math.random();
            choiceTree.insert(rank, candidate.id);
        }
        return choiceTree;
    };

    return self;

}

}