export default function (Renderer) {

const buttonColor = "blue";
const borderColor = "magenta";
const highlightColor = "green";

return function ButtonRenderer(menuItem) {

    const self = Renderer( menuItem.transform );

    const textSpec = {
        text: menuItem.text,
        location: { x: self.width/2, y: self.height/2 },
        font: "48px san sarif",
        color: buttonColor,
        border: { color: borderColor, thickness: 3 },
        alignment: "center"
    };

    const borderSpec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: { x: self.width, y: self.height },
        color: buttonColor
    };


    const highlightSpec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: { x: self.width, y: self.height },
        color: highlightColor
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
