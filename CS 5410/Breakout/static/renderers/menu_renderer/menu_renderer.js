export default function (
    ButtonRenderer,
    ScoreRenderer,
    Renderer
) {

return function MenuRenderer(canvas, simulation) {

    const self = Renderer( simulation.transform );

    const titleSpec = {
        text: "Breakout",
        location: {x: simulation.transform.width / 2, y: 100},
        font: "96px serif",
        color: "blue",
        alignment: "center",
        border: { color: "magenta", thickness: 3 }
    };

    self.render = function () {
        clearCursor();
        drawBackground();
        drawTitle();
        appendButtons();
        const options = simulation.getOptions();
        if (options.highScores)
            appendScores();
    };

    const appendButtons = function () {
        for (let button of simulation.getButtons()) {
            self.children.push( ButtonRenderer(button) );
        }
    };

    const appendScores = function () {
        const scoreStuffs = {
            transform: simulation.transform,
            list: simulation.getHighScores()
        };
        self.children.push( ScoreRenderer(scoreStuffs) );
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

    const drawTitle = function () {
        self.graphics.drawText( titleSpec );
    };

    return self;

}

}
