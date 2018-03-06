export default function (
    RowRenderer,
    Renderer
) {

return function (color, rowGroup) {

    const self = Renderer( rowGroup.transform );

    self.render = function () {
        for (let row of rowGroup.rows) {
            self.children.push( createRowRenderer(row) );
        }
    };

    const createRowRenderer = function(row) {
        return RowRenderer( color, row );
    };

    return self;

}

}
