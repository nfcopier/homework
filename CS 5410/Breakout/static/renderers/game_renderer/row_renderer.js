export default function (
    BrickRenderer,
    Renderer
) {

return function (color, row) {

    const self = Renderer( row.getTransform() );

    self.render = function() {
        for (let brick of row.getChildren()) {
            self.children.push( createBrickRenderer( brick ) )
        }
    };

    const createBrickRenderer = function (brick) {
        return BrickRenderer( color, brick );
    };

    return self;

}

}
