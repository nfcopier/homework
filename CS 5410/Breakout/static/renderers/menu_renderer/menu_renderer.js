export default function (
    ButtonRenderer,
    Renderer
) {

return function MenuRenderer(canvas, simulation) {

    const self = Renderer( simulation.transform );

    for (let button of simulation.getButtons()) {
        self.children.push( ButtonRenderer(button) );
    }

    const titleSpec = {
        text: "Breakout",
        location: {x: 512, y: 200},
        font: "96px san sarif",
        color: "blue",
        alignment: "center",
        border: { color: "magenta", thickness: 3 }
    };

    self.render = function () {
        self.graphics.clearCursor();
        drawBackground();
        drawTitle();
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
