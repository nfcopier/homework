const GameObject = require("./game_object.js");
const CollisionDetector = require("../collision_systems/bounding_box_detector.js");

const KILL_AWARD = 10;

module.exports = function Projectile(speed, width, height, lifetime, owner) {

    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    function calculateTransform() {
        const ownerTransform = owner.getTransform();
        const ownerCenter = {
            x: ownerTransform.x + ownerTransform.width / 2,
            y: ownerTransform.y + ownerTransform.height / 2
        };
        const offset = -ownerTransform.height / 2 - height;
        const theta = ownerTransform.theta;
        return {
            x     : ownerCenter.x + offset * Math.sin(theta),
            y     : ownerCenter.y + offset * Math.cos(theta),
            theta : theta,
            width : width,
            height: height
        };
    }

    const transform = calculateTransform();

    const self = GameObject(transform);

    const velocity = {
        x: speed * -Math.sin(transform.theta),
        y: speed * -Math.cos(transform.theta)
    };

    self.update = function(elapsedTime) {
        lifetime -= elapsedTime;
        transform.x += velocity.x * elapsedTime;
        transform.y += velocity.y * elapsedTime;
    };

    self.doCollisionWithPlayer = function(player) {
        if (player.isDead()) return;
        const detector = CollisionDetector(transform, player.getTransform());
        if (!detector.collisionOccurred()) return;
        player.damage(self.damage());
        if (player.isDead()) owner.award(KILL_AWARD);
        self.end();
    };

    self.doCollisionWithProjectile = function(projectile) {
        if (projectile === self) return;
        const detector = CollisionDetector(transform, projectile.getTransform());
        if (!detector.collisionOccurred()) return;
        projectile.end();
        self.end();
    };

    self.isActive = () => lifetime > 0;

    self.end = () => lifetime = 0;

    self.isMissile = () => false;
    self.isBullet = () => false;

    self.ownData = function() {
        return {
            id       : id,
            transform: transform,
            lifetime : lifetime
        };
    };

    return self;

};
