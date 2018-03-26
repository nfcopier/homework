export default function (
    Candidates,
    Votes
) {

    return function App() {

        const self = {};

        const candidates = Candidates();

        const votes = Votes(candidates);

        self.votes = function () { return votes; };

        self.start = function () { };

        return self;

    }

}