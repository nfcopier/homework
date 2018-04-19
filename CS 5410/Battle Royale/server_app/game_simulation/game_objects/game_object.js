module.exports = function () {

return function GameObject(transform) {

    const self = {};

    let parent = null;
    const children = [];

    self.addChild = function (child) {
        child._setParent( self );
        children.push( child );
    };

    self._setParent = function (newParent) { parent = newParent };

    self.getParent = function () { return parent; };

    self.hasChildren = function () { return children.length > 0; };

    self.getChildren = function () { return children; };

    self.removeChild = function (child) {
        const index = children.indexOf( child );
        if (index < 0) throw "This does not contain child";
        children.splice( index, 1 );
    };

    self.destroy = function () {
        parent.removeChild( self );
    };

    self.toAncestorCoords = function (ancestor) {
        if (ancestor == null) throw "Ancestor cannot be null";
        const offset = getOffset( parent, ancestor );
        if (offset === null) return null;
        return {
            x: transform.x + offset.x,
            y: transform.y + offset.y,
            theta: transform.theta + offset.theta,
            width: transform.width,
            height: transform.height
        };
    };

    const getOffset = function (parent, ancestor) {
        if (ancestor === null) throw "Object is not an ancestor of this";
        if (parent === ancestor) return { x: 0, y: 0, theta: 0};
        const offset = getOffset( parent.getParent(), ancestor );
        const parentTransform = parent.getTransform();
        return {
            x: parentTransform.x + offset.x,
            y: parentTransform.y + offset.y,
            theta: parentTransform.theta + offset.theta
        };
    };

    self.getTransform = function () { return transform; };

    return self;

}

};
