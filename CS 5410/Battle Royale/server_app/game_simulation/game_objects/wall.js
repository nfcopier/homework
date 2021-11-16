const CollisionDetector = require("../collision_systems/continuous_collision_detector.js");
const GameObject = require("./game_object.js");

const WALL_THICKNESS = 10;

module.exports = function Wall(parent, point1, point2) {

    const parentTransform = parent.getTransform();

    const transform = {
        x     : Math.min(point1.x, point2.x) - WALL_THICKNESS,
        y     : Math.min(point1.y, point2.y) - WALL_THICKNESS,
        width : Math.abs(point1.x - point2.x) + WALL_THICKNESS * 2,
        height: Math.abs(point1.y - point2.y) + WALL_THICKNESS * 2,
        theta : 0
    };

    const self = GameObject(transform);

    self.doCollisionWithPlayer = (player) => {
        const detector =
                  CollisionDetector(player, self);
        const collisionPoint = detector.collisionOccurred();
        if (!collisionPoint) return;
        const thisTransform = self.getTransform();
        const t = player.getTransform();
        if (collisionPoint.x + t.width > thisTransform.x && collisionPoint.x < thisTransform.x + thisTransform.width)
            t.y = collisionPoint.y;
        else
            t.x = collisionPoint.x;
    };

    self.doCollisionWithProjectile = (projectile) => {
        const detector =
                  CollisionDetector(projectile, self);
        const collisionPoint = detector.collisionOccurred();
        if (!collisionPoint) return;
        projectile.end();
    };

    self.getTransform = () => {
        return {
            x     : transform.x + parentTransform.x,
            y     : transform.y + parentTransform.y,
            theta : transform.theta + parentTransform.theta,
            width : transform.width,
            height: transform.height
        };
    };

    self.previousTransform = self.getTransform;

    return self;

};
