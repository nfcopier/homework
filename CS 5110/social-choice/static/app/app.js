export default function (
    Votes
) {

    return function App() {

        const self = {};

        const votes = Votes([]);

        self.votes = function () { return votes; };

        self.start = function () { };

        return self;

    }

}