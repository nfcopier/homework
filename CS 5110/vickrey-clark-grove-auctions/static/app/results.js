export default function () {

return function Results(candidates, votes) {

    const self = {};

    self.calculate = function () {
        const bordaRanks = _toRanking( _tallyVotes( _bordaTally ) );
        const candidateArray = candidates.toArray();
        return candidateArray.map( (c, index) => {
            return {
                rank: index + 1,
                borda: candidateArray[ bordaRanks[index]-1 ].name
            };
        });
    };

    const _toRanking = function (tally) {
        const keys = Object.keys( tally );
        keys.sort( (l, r) => tally[l] - tally[r] );
        return keys;
    };

    const _tallyVotes = function (tallyFunction) {
        const choiceTally = (results, vote) => {
            const choices = Array.from( vote.choices );
            return choices.reduce( tallyFunction, results );
        };
        return votes.toArray().reduce( choiceTally, _emptyResults() );
    };

    const _bordaTally = function ( results, choice, index) {
            results[choice.value] += candidates.count() - index;
            return results;
    };

    const _emptyResults = function () {
        return candidates.toArray().reduce( _zeroPoints, {} );
    };

    const _zeroPoints = function (results, candidate) {
        results[candidate.id] = 0;
        return results;
    };

    return self;
}

}