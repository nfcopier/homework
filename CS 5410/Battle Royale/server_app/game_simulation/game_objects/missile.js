module.exports = function (Projectile) {

const SPEED = 0.5;
const WIDTH = 1;
const HEIGHT = 10;
const LIFETIME = 10000;
const DAMAGE = 10;

return function Missile(owner, transform) {

    const self = Projectile( SPEED, WIDTH, HEIGHT, LIFETIME, owner, transform );

    self.isMissile = () => true;

    self.damage = () => DAMAGE;

    return self;

}

};
