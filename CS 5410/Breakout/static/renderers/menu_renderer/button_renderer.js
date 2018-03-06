export default function (Renderer) {

const BUTTON_COLOR = "blue";
const BORDER_COLOR = "magenta";
const DISABLED_COLOR = "grey";

return function ButtonRenderer(menuItem) {

    const self = Renderer( menuItem.transform );

    const textSpec = {
        text: menuItem.text,
        location: { x: self.width/2, y: self.height/2 },
        font: "36px serif",
        color: BUTTON_COLOR,
        border: { color: BORDER_COLOR, thickness: 3 },
        alignment: "center"
    };

    const borderSpec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: { x: self.width, y: self.height },
        color: menuItem.isDisabled ? DISABLED_COLOR : BUTTON_COLOR
    };


    const highlightSpec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: { x: self.width, y: self.height },
        color: BUTTON_COLOR
    };

    self.render = function () {
        if (menuItem.hasMouse) {
            self.graphics.setCursor("pointer");
            drawHighlight();
        }
        drawBorder();
        drawText();
    };

    const drawHighlight = function () {
        self.graphics.drawRectangle( highlightSpec );
    };

    const drawBorder = function () {
        self.graphics.strokeRectangle( borderSpec );
    };

    const drawText = function () {
        self.graphics.drawText( textSpec );
    };

    return self;

}

}
