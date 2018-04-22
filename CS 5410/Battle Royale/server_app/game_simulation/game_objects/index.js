const gameObject = require("./game_object");
const avatar = require("./avatar");
const projectile = require("./projectile");
const missile = require("./missile");
const bullet = require("./bullet");

module.exports = function (
    CollisionDetector
) {

    const GameObject = gameObject();

    const Avatar = avatar( GameObject );

    const Projectile = projectile( GameObject, CollisionDetector );

    const Missile = missile( Projectile );

    const Bullet = bullet( Projectile );

    return {
        GameObject: GameObject,
        Avatar: Avatar,
        Missile: Missile,
        Bullet: Bullet
    }
};
