module.exports = function GameObject(transform) {

    const self = {};

    let parent = null;
    let previousTransform;
    const children = [];

    self.addChild = (child) => {
        child._setParent(self);
        children.push(child);
    };

    self._setParent = (newParent) => { parent = newParent; };

    self.getParent = () => { return parent; };

    self.hasChildren = () => { return children.length > 0; };

    self.getChildren = () => { return children; };

    self.removeChild = (child) => {
        const index = children.indexOf(child);
        if (index < 0) throw "This does not contain child";
        children.splice(index, 1);
    };

    self.destroy = () => {
        parent.removeChild(self);
    };

    self.toAncestorCoords = (ancestor) => {
        if (ancestor == null) throw "Ancestor cannot be null";
        const offset = getOffset(parent, ancestor);
        return {
            x     : transform.x + offset.x,
            y     : transform.y + offset.y,
            theta : transform.theta + offset.theta,
            width : transform.width,
            height: transform.height
        };
    };

    const getOffset = (parent, ancestor) => {
        if (ancestor === null) throw "Object is not an ancestor of this";
        if (parent === ancestor) return {x: 0, y: 0, theta: 0};
        const offset = getOffset(parent.getParent(), ancestor);
        const parentTransform = parent.getTransform();
        return {
            x    : parentTransform.x + offset.x,
            y    : parentTransform.y + offset.y,
            theta: parentTransform.theta + offset.theta
        };
    };

    self.getTransform = () => { return transform; };

    self.saveTransform = () => {
        previousTransform = Object.assign({}, transform);
    };

    self.previousTransform = () => previousTransform;

    self.saveTransform();

    return self;

};
