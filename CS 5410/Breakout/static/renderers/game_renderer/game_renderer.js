export default function (
    PaddleRenderer,
    Renderer
) {

return function GameRenderer(simulation) {

    const self = Renderer( simulation.transform );

    self.render = function () {
        clearCursor();
        drawBackground();
        addChildren();
    };

    const addChildren = function () {
        const paddleRenderer = PaddleRenderer( simulation.getPaddle() );
        self.children.push( paddleRenderer );
    };

    const clearCursor = function () {
        self.graphics.clearCursor();
    };

    const drawBackground = function () {
        self.graphics.drawRectangle({
            upperLeft: {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color: "#000033"
        });
    };

    return self;

}

}
