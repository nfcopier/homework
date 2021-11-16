export default function(Renderer) {

    const BUTTON_COLOR = "blue";
    const DISABLED_COLOR = "grey";

    return function TextFieldRenderer(menuItem) {

        const self = Renderer(menuItem.transform);

        const textSpec = {
            text     : menuItem.text !== null ? menuItem.text : menuItem.placeholder,
            location : {x: self.width / 2, y: self.height / 2},
            font     : "36px serif",
            color    : menuItem.text ? "blue" : "grey",
            alignment: "center"
        };

        const borderSpec = {
            upperLeft  : {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color      : menuItem.isDisabled ? DISABLED_COLOR : BUTTON_COLOR
        };

        const backgroundSpec = {
            upperLeft  : {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color      : menuItem.isDisabled ? DISABLED_COLOR : "#CCCCFF"
        };

        self.render = function() {
            if (menuItem.hasMouse) {
                self.graphics.setCursor("text");
            }
            drawBackground();
            drawBorder();
            drawText();
        };

        const drawBackground = function() {
            self.graphics.drawRectangle(backgroundSpec);
        };

        const drawBorder = function() {
            self.graphics.strokeRectangle(borderSpec);
        };

        const drawText = function() {
            self.graphics.drawText(textSpec);
        };

        return self;

    };

}
