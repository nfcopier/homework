export default function (
    CountdownRenderer,
    PaddleRenderer,
    BallRenderer,
    ScoreRenderer,
    PaddlesRenderer,
    RowGroupRenderer,
    AnalyticsRenderer,
    ParticleEffectRenderer,
    Renderer
) {

return function GameRenderer(simulation) {

    const transform = simulation.getTransform();

    const self = Renderer( transform );

    const fetchImage = function () {
        const image = new Image();
        image.src = "./static/images/space_background.jpg";
        image.onload = function () {
            drawBackground = drawBackgroundImage( image );
        };
    };

    self.render = function () {
        clearCursor();
        drawBackground();
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
        self.children.push( createPaddleRenderer() );
        for (let ball of simulation.getBalls())
            self.children.push( createBallRenderer( ball ) );
        self.children.push( createScoreRenderer() );
        self.children.push( createPaddlesRenderer() );
        for (let rowGroup of simulation.getChildren())
            self.children.push( createRowGroupRenderer( rowGroup ) )
        for (let effect of simulation.getParticleEffects())
            self.children.push( createParticleEffectRenderer( effect ) )
        const countdown = simulation.getCountdown();
        if (countdown.value > 0)
            self.children.push( createCountdownRenderer( countdown ) );
        self.children.push( createAnalyticsRenderer() );
    };

    const createPaddleRenderer = function () {
        return PaddleRenderer( simulation.getPaddle() );
    };

    const createBallRenderer = function (ball) {
        return BallRenderer( ball );
    };

    const createScoreRenderer = function () {
        const score =  simulation.getScore();
        const gameTransform = simulation.getTransform();
        return ScoreRenderer( score, gameTransform );
    };

    const createPaddlesRenderer = function () {
        const paddleCount = simulation.getPaddleCount();
        return PaddlesRenderer( paddleCount, simulation.getTransform() );
    };

    const createRowGroupRenderer = function (rowGroup) {
        return RowGroupRenderer( rowGroup );
    };

    const createParticleEffectRenderer = function (effect) {
        return ParticleEffectRenderer( effect );
    };

    const createCountdownRenderer = function (countdown) {
        return CountdownRenderer( countdown );
    };

    const createAnalyticsRenderer = function() {
        const analytics = simulation.getAnalytics();
        return new AnalyticsRenderer( analytics, simulation.getTransform() );
    };

    const clearCursor = function () { self.graphics.clearCursor(); };

    const drawBackgroundRectangle = function () {
        self.graphics.drawRectangle({
            upperLeft: {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color: "#000033"
        });
    };

    const drawBackgroundImage = function(image) { return function () {
        const spec = {
            x: transform.x,
            y: transform.y,
            image: image,
            width: transform.width,
            height: transform.height
        };
        self.graphics.drawImage( spec );
    }};

    let drawBackground = drawBackgroundRectangle;

    fetchImage();

    return self;

}

}
