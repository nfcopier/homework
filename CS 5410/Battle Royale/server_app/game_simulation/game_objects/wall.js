module.exports = function (
    CollisionDetector,
    GameObject
) {

const WALL_THICKNESS = 10;

return function Wall(parent, point1, point2) {

    const parentTransform = parent.getTransform();

    const transform = {
        x: Math.min( point1.x, point2.x ) - WALL_THICKNESS,
        y: Math.min( point1.y, point2.y ) - WALL_THICKNESS,
        width: Math.abs( point1.x - point2.x ) + WALL_THICKNESS * 2,
        height: Math.abs( point1.y - point2.y ) + WALL_THICKNESS * 2,
        theta: 0
    };

    const self = GameObject( transform );

    self.doCollisionWithPlayer = function (player, elapsedTime) {
        const detector =
                  CollisionDetector( player, self, Math.round( elapsedTime ));
        const collisionPoint = detector.collisionOccurred();
        if (!collisionPoint) return;
        const thisTransform = self.getTransform();
        const t = player.getTransform();
        if (collisionPoint.x + t.width > thisTransform.x && collisionPoint.x < thisTransform.x + thisTransform.width )
            t.y = collisionPoint.y;
        else
            t.x = collisionPoint.x;
    };

    self.getTransform = function () {
        return {
            x: transform.x + parentTransform.x,
            y: transform.y + parentTransform.y,
            theta: transform.theta + parentTransform.theta,
            width: transform.width,
            height: transform.height
        }
    };

    self.previousTransform = self.getTransform;

    return self;

}

};
