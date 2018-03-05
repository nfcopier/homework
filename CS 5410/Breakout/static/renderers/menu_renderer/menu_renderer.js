export default function (
    ButtonRenderer,
    Renderer
) {

return function MenuRenderer(canvas, simulation) {

    const self = Renderer( simulation.transform );

    const titleSpec = {
        text: "Breakout",
        location: {x: 512, y: 100},
        font: "96px san sarif",
        color: "blue",
        alignment: "center",
        border: { color: "magenta", thickness: 3 }
    };

    self.render = function () {
        clearCursor();
        drawBackground();
        drawTitle();
        appendButtons();
    };

    const appendButtons = function () {
        for (let button of simulation.getButtons()) {
            self.children.push( ButtonRenderer(button) );
        }
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
