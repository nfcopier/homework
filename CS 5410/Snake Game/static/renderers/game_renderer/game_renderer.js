export default function (
    CountdownRenderer,
    ScoreRenderer,
    AnalyticsRenderer,
    Renderer
) {

return function GameRenderer(simulation) {

    const transform = simulation.getTransform();

    const self = Renderer( transform );

    self.render = function () {
        clearCursor();
        if (simulation.isGameOver())
            drawGameOver();
        else {
            addChildren();
        }
    };

    const drawGameOver = function () {
        const mainSpec = {
            text: "Game Over",
            location: {x: simulation.getTransform().width / 2, y: 200},
            font: "96px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        };
        self.graphics.drawText( mainSpec );
        const scoreSpec = {
            text: `Score: ${simulation.getScore()}`,
            location: {x: simulation.getTransform().width / 2, y: 350},
            font: "48px serif",
            color: "blue",
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        };
        self.graphics.drawText( scoreSpec );
    };

    const addChildren = function () {
        self.children.push( createScoreRenderer() );
        const countdown = simulation.getCountdown();
        if (countdown.value > 0)
            self.children.push( createCountdownRenderer( countdown ) );
        self.children.push( createAnalyticsRenderer() );
    };

    const createScoreRenderer = function () {
        const score =  simulation.getScore();
        const gameTransform = simulation.getTransform();
        return ScoreRenderer( score, gameTransform );
    };

    const createCountdownRenderer = function (countdown) {
        return CountdownRenderer( countdown );
    };

    const createAnalyticsRenderer = function() {
        const analytics = simulation.getAnalytics();
        return new AnalyticsRenderer( analytics, simulation.getTransform() );
    };

    const clearCursor = function () { self.graphics.clearCursor(); };

    return self;

}

}
