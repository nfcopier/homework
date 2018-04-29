export default function (
    Table,
    View
) {

return function BiddersTable( bidders ) {

    const self = View();

    self.events = () => { return {
        "click .button": addBidder
    } };

    const addBidder = function() {
        const $input = self.$el.find( "input" );
        const value = $input.val();
        if (!value)
            $input.addClass( "is-danger" );
        bidders.add( value );
        self.render();
    };

    self.render = function() {
        self.$el.empty();
        _renderHeader();
        _renderInputs();
        _renderTable();
        self.delegateEvents();
        return self;
    };

    const _renderHeader = function () {
        self.$el.append( _header );
    };

    const _renderInputs = function () {
        self.$el.append( _inputTemplate );
    };

    const _renderTable = function() {
        const table = Table(
            ["Name", "Bid per click"],
            ["name", "valuePerClick"],
            bidders,
            true
        );
        self.listenToOnce( table, "delete", removeBidder );
        self.$el.append( table.render().el );
    };

    const removeBidder = function(model) {
        bidders.remove( model );
        self.render();
    };

    const _header = `
        <h1 class="title">Bidders</h1>
        <hr>
    `;

    const _inputTemplate = `
        <div class="level">
            <div class="field has-addons level-left">
                <div class="control">
                    <a class="button is-primary">Add</a>
                </div>
                <div class="control">
                    <input class="input" type="number" placeholder="Bid per click">
                </div>
            </div>
        </div>
    `;

    return self;

}

}
