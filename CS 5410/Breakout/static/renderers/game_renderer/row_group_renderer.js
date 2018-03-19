export default function (
    RowRenderer,
    Renderer
) {

return function (rowGroup) {

    const self = Renderer( rowGroup.getTransform() );

    self.render = function () {
        const color = rowGroup.getColor();
        for (let row of rowGroup.getChildren()) {
            self.children.push( createRowRenderer(color, row) );
        }
    };

    const createRowRenderer = function(color, row) {
        return RowRenderer( color, row );
    };

    return self;

}

}
