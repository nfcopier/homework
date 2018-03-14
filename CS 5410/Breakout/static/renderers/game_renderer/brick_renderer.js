export default function (
    Renderer
) {

return function (color, brick) {

    const transform = brick.getTransform();

    const self = Renderer( transform );

    const spec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: { x: transform.width, y: transform.height },
        color: color
    };

    self.render = function () {
        self.graphics.drawRectangle( spec );
    };

    return self;

}

}
