export default function (
    View,
    Table
) {

return function CandidateTable(candidates) {

    const self = View();

    self.events = () => { return {
        "click .button" : _addRandomCandidates,
        "change .input" : _removeDanger
    } };

    const _addRandomCandidates = function () {
        const $input = self.$el.find(".input");
        const count = $input.val();
        if (!count)
            $input.addClass( "is-danger" );
        else {
            candidates.addRandom(count);
            self.trigger( "add" );
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
        const table = Table(
            ["Id", "Name"],
            ["id", "name"],
            candidates
        );
        self.$el.append( table.render().el );
    };

    const _header = `
        <h1 class="title">Candidates</h1>
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