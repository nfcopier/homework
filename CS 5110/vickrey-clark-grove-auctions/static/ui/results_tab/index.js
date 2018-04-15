export default function (
    Table,
    Tab
) {

const LABEL_TEXT = "Results";

return function ResultsTab(results) {

    const self = Tab( LABEL_TEXT );

    const _superRender = self.render;
    self.render = function () {
        _superRender();
        self.$el.empty();
        self.$el.append( _renderTable() );
        return this;
    };

    const _renderTable = function () {
        const table = Table(
            ["", "Borda Ranking"],
            ["rank", "borda"],
            results.calculate()
        );
        return table.render().el;
    };

    return self;

}

}