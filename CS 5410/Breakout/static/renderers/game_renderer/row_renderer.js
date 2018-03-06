export default function (
    BrickRenderer,
    Renderer
) {

return function (color, row) {

    const self = Renderer( row.transform );

    self.render = function() {
        for (let brick of row.getBricks()) {
            self.children.push( createBrickRenderer( brick ) )
        }
    };

    const createBrickRenderer = function (brick) {
        return BrickRenderer( color, brick );
    };

    return self;

}

}
