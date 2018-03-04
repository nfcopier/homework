export default function () {

return function Renderer(transform) {

    const self = {};

    self._render = function (context) {
        context.save();
        applyTransformTo( context );
        self.render();
        renderChildrenTo( context );
        context.restore();
    };

    const applyTransformTo = function (context) {
        const position = transform.position;
        const rotation = transform.rotation;
        context.translate( -position.x, -position.y );
        context.rotate( -rotation );
    };

    self.render = function () {};

    const renderChildrenTo = function (context) {
        const children = self.getChildren();
        for (const child of children) {
            child._render( context );
        }
    };

    self.getChildren = function () { return []; };

    return self;

}

}
