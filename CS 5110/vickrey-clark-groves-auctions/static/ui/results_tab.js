export default function (
    Table,
    Tab
) {

const LABEL_TEXT = "Results";

return function ResultsTab(app) {

    const self = Tab( LABEL_TEXT );

    self.render = function() {
        self.$el.empty();
        setTimeout(_renderTable, 0);
        return self;
    };

    const _renderTable = function() {
        const table = Table(
            ["Name", "Slot", "Cost per week"],
            ["name", "slot", "costPerWeek"],
            app.results()
        );
        self.$el.append( table.render().el );
    };

    return self;

}

}
