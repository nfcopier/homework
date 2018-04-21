module.exports = function (
    Actions,
    Avatar
) {

const FULL_HEALTH = 20;
const COUNTDOWN_TIME = 3000;
const MAX_MISSILE_AMMO = 4;
const MAX_BULLET_AMMO = 100;
const BULLET_BUNDLE = 10;
const MISSILE_COOL_DOWN = 1000;
const BULLET_COOL_DOWN = 200;

return function Player(client) {

    const self = {};

    let score = 0;
    let avatar = null;
    let input;
    let location;
    let health;
    let countdown;
    let missileAmmo;
    let bulletAmmo;
    let missileFired;
    let bulletFired;
    let missileCoolDownTimer;
    let bulletCoolDownTimer;
    let missileInCoolDown;
    let bulletInCoolDown;

    const updateCountdown = self.update = function(elapsedTime) {
        countdown -= elapsedTime;
        if (countdown > 0) return;
        self.update = updatePlayer;
        avatar = Avatar( location );
    };

    const updatePlayer = function() {
        missileFired = bulletFired = false;
        input = client.input();
        if (!input) return;
        updateRotation();
        updateLocation( input.elapsedTime );
        fireMissile( input.elapsedTime );
        fireBullet( input.elapsedTime );
    };

    const updateRotation = function () {
        avatar.rotate( input.mousePosition )
    };

    const updateLocation = function (elapsedTime) {
        const vector = {
            x: xFrom( input.move ),
            y: yFrom( input.move )
        };
        avatar.move( vector, elapsedTime );
    };

    const xFrom = function(moveActions) {
        switch (moveActions.x) {
            case Actions.MOVE_LEFT:
                return -1;
            case Actions.MOVE_RIGHT:
                return 1;
            default:
                return 0;
        }
    };

    const yFrom = function(moveActions) {
        switch (moveActions.y) {
            case Actions.MOUSE_UP:
                return 1;
            case Actions.MOVE_DOWN:
                return -1;
            default:
                return 0;
        }
    };

    const fireMissile = function (elapsedTime) {
        if (missileInCoolDown) {
            missileCoolDownTimer -= elapsedTime;
            if (missileCoolDownTimer > 0) return;
            missileInCoolDown = false;
        }
        if (missileAmmo <= 0 || !input.missileFired) return;
        missileFired = true;
        missileAmmo -= 1;
        missileInCoolDown = true;
        missileCoolDownTimer = MISSILE_COOL_DOWN;
    };

    const fireBullet = function(elapsedTime) {
        if (bulletInCoolDown) {
            bulletCoolDownTimer -= elapsedTime;
            if (bulletCoolDownTimer > 0) return;
            bulletInCoolDown = false;
        }
        if (bulletFired <= 0 || !input.bulletFired) return;
        bulletFired = true;
        bulletAmmo -= 1;
        bulletInCoolDown = true;
        bulletCoolDownTimer = BULLET_COOL_DOWN;
    };

    self.respawn = function(loc) {
        location = loc;
        health = FULL_HEALTH;
        countdown = COUNTDOWN_TIME;
        missileAmmo = MAX_MISSILE_AMMO;
        bulletAmmo = MAX_BULLET_AMMO;
        missileInCoolDown = false;
        bulletInCoolDown = false;
        client.respawn( location );
        self.update = updateCountdown
    };

    self.avatar = () => avatar;

    self.sendUpdate = function () {
        if (!input) return;
        const state = {
            transform: avatar.getTransform(),
            score: score,
            health: health,
            missileAmmo: missileAmmo,
            bulletAmmo: bulletAmmo,
            sequenceNumber: input.sequenceNumber
        };
        client.sendPlayerState( state );
    };

    self.sendGameState = (gameState) => client.sendGameState( gameState );

    self.damage = (value) => health -= value;

    self.heal = function (value) {
        health += value;
        if (health > FULL_HEALTH) health = FULL_HEALTH;
    };

    self.addMissile = function () {
        missileAmmo += 1;
        if (missileAmmo > MAX_MISSILE_AMMO) missileAmmo = MAX_MISSILE_AMMO;
    };

    self.addBullets = function () {
        bulletAmmo += BULLET_BUNDLE;
        if (bulletAmmo > MAX_BULLET_AMMO) bulletAmmo = MAX_BULLET_AMMO;
    };

    self.projectilesFired = () => { return {
        transform: avatar.getTransform(),
        missilesFired: missileFired,
        bulletsFired: bulletFired
    }};

    self.isDead = () => health <= 0;

    return self;

}

};
