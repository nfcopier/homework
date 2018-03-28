export default function (
    Candidates,
    Votes
) {

    return function App() {

        const self = {};

        const candidates = Candidates();

        const votes = Votes(candidates);

        self.candidates = () => candidates;
        self.votes = () => votes;

        self.start = function () { };

        return self;

    }

}