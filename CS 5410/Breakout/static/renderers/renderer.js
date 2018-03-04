export default function (
    Graphics
) {

return function Renderer(transform) {

    const self = {};

    self.children = [];

    self.upperLeft = {
        x: transform.x,
        y: transform.y
    };

    self.bottomRight = {
        x: transform.width,
        y: transform.height
    };

    self._render = function (context) {
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
            upperLeft: self.upperLeft,
            bottomRight: self.bottomRight,
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
