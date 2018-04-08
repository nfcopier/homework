export default function (color, Renderer) {

const BORDER_THICKNESS = 2;

return function BlockRenderer(transform) {

    const self = Renderer( transform );

    const borderSpec = {
        color: "black",
        upperLeft: {
            x: 0,
            y: 0
        },
        bottomRight: {
            x: transform.width,
            y: transform.height
        }
    };

    const fillSpec = {
        color: color,
        upperLeft: {
            x: BORDER_THICKNESS,
            y: BORDER_THICKNESS
        },
        bottomRight: {
            x: transform.width - BORDER_THICKNESS*2,
            y: transform.height - BORDER_THICKNESS*2
        }
    };

    self.render = function() {
        self.graphics.drawRectangle( borderSpec );
        self.graphics.drawRectangle( fillSpec );
    };

    return self;

}

}
