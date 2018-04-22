module.exports = function (Projectile) {

const SPEED = 1;
const WIDTH = 1;
const HEIGHT = 2;
const LIFETIME = 1000;
const DAMAGE = 1;

return function Bullet(owner, transform) {

    const self = Projectile( SPEED, WIDTH, HEIGHT, LIFETIME, owner, transform );

    self.isBullet = () => true;

    self.damage = () => DAMAGE;

    return self;

}

};
