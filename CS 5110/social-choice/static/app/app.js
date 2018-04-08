export default function (
    Candidates,
    Votes,
    Results
) {

    return function App() {

        const self = {};

        const candidates = Candidates();
        const votes = Votes( candidates );
        const results = Results( candidates, votes );

        self.candidates = () => candidates;
        self.votes = () => votes;
        self.results = () => results;

        self.start = function () { };

        return self;

    }

}