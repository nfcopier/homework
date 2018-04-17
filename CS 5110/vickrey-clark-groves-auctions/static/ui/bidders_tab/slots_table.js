export default function (
    Table,
    View
) {

    return function SlotsTable( slots ) {

        const self = View();

        self.events = () => { return {
            "click .button": addSlot
        } };

        const addSlot = function() {
            const $input = self.$el.find( "input" );
            const value = $input.val();
            if (!value)
                $input.addClass( "is-danger" );
            slots.add( value );
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
            const values = slots.toArray().map( s => {
                return { name: `Slot ${s.id}`, clicks: s.clicks, id: s.id }
            } );
            const table = Table(
                ["Name", "Clicks per week"],
                ["name", "clicks"],
                values,
                true
            );
            self.listenToOnce( table, "delete", removeSlot );
            self.$el.append( table.render().el );
        };

        const removeSlot = function(model) {
            slots.remove( model );
            self.render();
        };

        const _header = `
            <h1 class="title">Slots</h1>
            <hr>
        `;

        const _inputTemplate = `
            <div class="level">
                <div class="field has-addons level-left">
                    <div class="control">
                        <a class="button is-primary">Add</a>
                    </div>
                <div class="control">
                    <input class="input" type="number" placeholder="Clicks per week">
                </div>
                </div>
            </div>
        `;

        return self;

    }

}
