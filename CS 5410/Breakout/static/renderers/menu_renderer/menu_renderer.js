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
        font: "48px san sarif",
        color: "blue",
        alignment: "center"
    };

    self.render = function () {
        drawBackground();
        self.graphics.drawText( titleSpec );
    };

    const drawBackground = function () {
        self.graphics.drawRectangle({
            upperLeft: self.upperLeft,
            bottomRight: self.bottomRight,
            color: "#000033"
        });
    };

    return self;

}

}
