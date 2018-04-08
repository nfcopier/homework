export default function (Renderer) {

const BORDER_WIDTH = 20;

return function (transform) {

    const self = Renderer( transform );

    const borderSpec = {
        color: "#006600",
        upperLeft: {x: transform.x, y: transform.y},
        bottomRight: {x: transform.width, y: transform.height}
    };

    const backgroundSpec = {
        color: "#000066",
        upperLeft: {
            x: transform.x + BORDER_WIDTH,
            y: transform.y + BORDER_WIDTH
        },
        bottomRight: {
            x: transform.width - BORDER_WIDTH*2,
            y: transform.height - BORDER_WIDTH*2
        }
    };

    self.render = function() {
        self.graphics.drawRectangle( borderSpec );
        self.graphics.drawRectangle( backgroundSpec );
    };

    return self;

}

}
