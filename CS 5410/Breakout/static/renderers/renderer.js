export default function (
    Graphics
) {

return function Renderer(transform) {

    const self = {};

    self.width = transform.width;
    self.height = transform.height;

    self._render = function (context) {
        self.children = [];
        context.save();
        applyTransformTo( context );
        self.graphics = Graphics( context );
        self.render();
        renderChildrenTo( context );
        context.restore();
    };

    const applyTransformTo = function (context) {
        context.translate( transform.x, transform.y );
        context.rotate( transform.theta );
    };

    self.render = function () {
        drawBackground();
    };

    const drawBackground = function () {
        self.graphics.drawRectangle({
            upperLeft: {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color: "red"
        });
    };

    const renderChildrenTo = function (context) {
        for (let child of self.children) {
            child._render( context );
        }
    };

    return self;

}

}
