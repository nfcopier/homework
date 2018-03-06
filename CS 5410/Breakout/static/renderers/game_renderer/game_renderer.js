export default function (
    CountdownRenderer,
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
        self.children.push( createPaddleRenderer() );
        const countdown = simulation.getCountdown();
        if (countdown.value > 0)
            self.children.push( createCountdownRenderer(countdown) )
    };

    const createPaddleRenderer = function () {
        return PaddleRenderer( simulation.getPaddle() );
    };

    const createCountdownRenderer = function (countdown) {
        return CountdownRenderer( countdown );
    };

    const clearCursor = function () { self.graphics.clearCursor(); };

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
