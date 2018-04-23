const gameObject = require("./game_object");
const avatar = require("./avatar");
const projectile = require("./projectile");
const missile = require("./missile");
const bullet = require("./bullet");
const wall = require("./wall");
const building = require("./building");

module.exports = function (
    collisionSystems
) {

    const GameObject = gameObject();

    const Avatar = avatar( GameObject );

    const Projectile = projectile(
        collisionSystems.BoundingBoxDetector,
        GameObject
    );

    const Missile = missile( Projectile );

    const Bullet = bullet( Projectile );

    const Wall = wall(
        collisionSystems.ContinuousCollisionDetector,
        GameObject
    );

    const Building = building(
        Wall,
        collisionSystems.BoundingBoxDetector,
        GameObject
    );

    return {
        GameObject: GameObject,
        Avatar: Avatar,
        Missile: Missile,
        Bullet: Bullet,
        Building: Building
    }
};
