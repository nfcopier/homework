export default function (
    CountdownRenderer,
    PaddleRenderer,
    BallRenderer,
    Renderer
) {

return function GameRenderer(simulation) {

    const self = Renderer( simulation.transform );

    self.render = function () {
        clearCursor();
        drawBackground();
        if (simulation.isGameOver())
            drawGameOver();
        else
            addChildren();
    };

    const drawGameOver = function () {
        const mainSpec = {
            text: "GameOver",
            location: {x: simulation.transform.width / 2, y: 200},
            font: "96px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 3 }
        };
        self.graphics.drawText( mainSpec );
        const scoreSpec = {
            text: `Score: ${simulation.getScore()}`,
            location: {x: simulation.transform.width / 2, y: 350},
            font: "48px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 3 }
        };
        self.graphics.drawText( scoreSpec );
    };


    const addChildren = function () {
        self.children.push( createPaddleRenderer() );
        for (let ball of simulation.getBalls())
            self.children.push( createBallRenderer( ball ) );
        const countdown = simulation.getCountdown();
        if (countdown.value > 0)
            self.children.push( createCountdownRenderer(countdown) )
    };

    const createPaddleRenderer = function () {
        return PaddleRenderer( simulation.getPaddle() );
    };

    const createBallRenderer = function (ball) {
        return BallRenderer( ball );
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
