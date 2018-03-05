export default function (
    Graphics
) {

return function Renderer(transform) {

    const self = {};

    self.width = transform.width;
    self.height = transform.height;

    self.children = [];

    self._render = function (context) {
        context.save();
        applyTransformTo( context );
        self.graphics = Graphics( context );
        self.render();
        // context.beginPath();
        // context.fillStyle = "red";
        // context.arc(2.5, 2.5, 2.5, 0, 2*Math.PI);
        // context.fill();
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
