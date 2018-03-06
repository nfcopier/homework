export default function (
    CountdownRenderer,
    PaddleRenderer,
    BallRenderer,
    ScoreRenderer,
    PaddlesRenderer,
    RowGroupRenderer,
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
            text: "Game Over",
            location: {x: simulation.transform.width / 2, y: 200},
            font: "96px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        };
        self.graphics.drawText( mainSpec );
        const scoreSpec = {
            text: `Score: ${simulation.getScore()}`,
            location: {x: simulation.transform.width / 2, y: 350},
            font: "48px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        };
        self.graphics.drawText( scoreSpec );
    };


    const addChildren = function () {
        self.children.push( createPaddleRenderer() );
        for (let ball of simulation.getBalls())
            self.children.push( createBallRenderer( ball ) );
        self.children.push( createScoreRenderer() );
        self.children.push( createPaddlesRenderer() );
        for (let rowGroup of simulation.getRowGroups())
            self.children.push( createRowGroupRenderer( rowGroup ) )
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

    const createScoreRenderer = function () {
        const score = {
            value: simulation.getScore(),
            transform: simulation.transform
        };
        return ScoreRenderer( score );
    };

    const createPaddlesRenderer = function () {
        const paddles = {
            count: simulation.getPaddleCount(),
            transform: simulation.transform
        };
        return PaddlesRenderer( paddles );
    };

    const createRowGroupRenderer = function (rowGroup) {
        const color = "red";
        return RowGroupRenderer( color, rowGroup );
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
