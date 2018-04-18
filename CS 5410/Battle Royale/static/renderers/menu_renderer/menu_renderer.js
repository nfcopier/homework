export default function (
    ButtonRenderer,
    TextFieldRenderer,
    ScoresRenderer,
    CreditsRenderer,
    Renderer
) {

return function MenuRenderer(canvas, simulation) {

    const self = Renderer( simulation.transform );

    const titleSpec = {
        text: "Battle Royale",
        location: {x: simulation.transform.width / 2, y: 100},
        font: "96px serif",
        color: "blue",
        alignment: "center",
        border: { color: "magenta", thickness: 2 }
    };

    const nameSpec = {
        location: {x: simulation.transform.width / 2, y: 250},
        font: "48px serif",
        color: "blue",
        alignment: "center",
        border: { color: "magenta", thickness: 2 }
    };

    self.render = function () {
        clearCursor();
        drawBackground();
        drawTitle();
        drawMenuName();
        appendButtons();
        appendTextFields();
        const options = simulation.getOptions();
        if (options.highScores)
            appendScores();
        if (options.credits)
            appendCredits();
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

    const drawMenuName = function () {
        const spec = Object.assign( {}, nameSpec );
        spec.text = simulation.getMenuName();
        self.graphics.drawText( spec );
    };

    const appendButtons = function () {
        for (let button of simulation.getButtons())
            self.children.push( ButtonRenderer(button) );
    };

    const appendTextFields = function () {
        for (let field of simulation.getTextFields())
            self.children.push( TextFieldRenderer(field) )
    };

    const appendScores = function () {
        const scoreStuffs = {
            transform: simulation.transform,
            list: simulation.getHighScores()
        };
        self.children.push( ScoresRenderer(scoreStuffs) );
    };

    const appendCredits = function () {
        const creditsStuffs = {
            transform: simulation.transform,
            list: simulation.getCredits()
        };
        self.children.push( CreditsRenderer(creditsStuffs) );
    };

    return self;

}

}
