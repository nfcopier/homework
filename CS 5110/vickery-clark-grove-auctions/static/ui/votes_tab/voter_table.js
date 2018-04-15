export default function (
    View,
    Table
) {

    return function VoterTable(candidates, voters, results) {

        const self = View();

        self.events = () => { return {
            "click .button" : _addRandomVoters,
            "change .input" : _removeDanger
        } };

        const _addRandomVoters = function () {
            const $input = self.$el.find(".input");
            const count = $input.val();
            if (!count)
                $input.addClass( "is-danger" );
            else {
                voters.addRandom(count);
                self.render();
                results.calculate();
            }
        };

        const _removeDanger = function () {
            const $input = self.$el.find(".input");
            $input.removeClass( "is-danger" );
        };

        self.render = function () {
            self.$el.empty();
            _renderHeader();
            _renderInputs();
            _renderTable();
            self.delegateEvents();
            return this;
        };

        const _renderHeader = function () {
            self.$el.append( _header );
        };

        const _renderInputs = function () {
            self.$el.append( _inputTemplate );
        };

        const _renderTable = function() {
            const array = candidates.toArray();
            const names = array.map( c => c.name );
            const ids = array.map( c => c.id );
            const table = Table(
                ["Id", "Voter Name", ...names],
                ["id", "name", ...ids],
                voters.toArray().map( _toViewModel )
            );
            self.$el.append( table.render().el );
        };

        const _toViewModel = function (vote) {
            const model = {
                id: vote.id,
                name: vote.name
            };
            const choices = Array.from( vote.choices );
            Array.from( candidates ).forEach( c => model[c.id] = 0 );
            choices.forEach( (choice, index) => {
                model[choice.value] = candidates.count() - index;
            });
            return model;
        };

        const _header = `
        <h1 class="title">Voters</h1>
        <hr>
    `;

        const _inputTemplate = `
        <div class="level">
            <div class="field has-addons level-left">
                <div class="control">
                    <a class="button is-primary">Add Random</a>
                </div>
                <div class="control">
                    <input class="input" type="number" placeholder="Count">
                </div>
            </div>
        </div>
    `;

        return self;

    }

}