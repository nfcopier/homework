export default function (
    CandidateTable,
    VoterTable,
    Tab
) {

    const LABEL_TEXT = "Votes";

    return function VotesTab(candidates, votes) {

        const self = Tab( LABEL_TEXT );

        const candidateTable = CandidateTable( candidates );
        const voterTable = VoterTable( candidates, votes );

        const _superRender = self.render;
        self.render = function () {
            _superRender.call(self);
            self.listenTo( candidateTable, "add", () => {self.render()} );
            self.$el.empty();
            self.$el.append( candidateTable.render().el );
            self.$el.append( voterTable.render().el );
            return self;
        };

        return self;

    }

}