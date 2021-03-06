export default function (
    Graphics
) {

return function Renderer(transform, color = "red") {

    const self = {};

    self.width = transform.width;
    self.height = transform.height;

    self._render = function (context) {
        self.children = [];
        context.save();
        applyTransformTo( context );
        self.graphics = Graphics( context );
        self.renderChild = renderChildTo( context );
        self.render();
        renderChildrenTo( context );
        context.restore();
    };

    const applyTransformTo = function (context) {
        const widthHalf = transform.width / 2;
        const heightHalf = transform.height / 2;
        context.translate( transform.x+widthHalf, transform.y+heightHalf );
        context.rotate( -transform.theta );
        context.translate( -widthHalf, -heightHalf );
    };

    self.render = function () {
        drawBackground();
    };

    const renderChildTo = (context) => (child) => child._render( context );

    const drawBackground = function () {
        self.graphics.drawRectangle({
            upperLeft: {x: 0, y: 0},
            bottomRight: {x: self.width, y: self.height},
            color: color
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
