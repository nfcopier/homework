const Actions = require("./actions.js");
const ScoreRepo = require("../score_repository.js");
const Avatar = require("./game_objects/avatar.js")

const FULL_HEALTH = 20;
const COUNTDOWN_TIME = 3000;
const MAX_MISSILE_AMMO = 4;
const MAX_BULLET_AMMO = 200;
const BULLET_BUNDLE = 50;
const MISSILE_COOL_DOWN = 1000;
const BULLET_COOL_DOWN = 250;
const HEAL_RATE = 5;

module.exports = function Player(client) {

    const self = {};

    let score = 0;
    let avatar;
    let input;
    let spawnPoint;
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
    let scoreRepo = ScoreRepo();
    const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const updateCountdown = self.update = (elapsedTime) => {
        countdown -= elapsedTime;
        if (countdown > 0) return;
        self.update = updatePlayer;
        avatar = Avatar(spawnPoint);
    };

    const updatePlayer = () => {
        missileFired = bulletFired = false;
        input = client.input();
        if (!input) return;
        updateRotation();
        updateLocation(input.elapsedTime);
        fireMissile(input.elapsedTime);
        fireBullet(input.elapsedTime);
    };

    const updateRotation = () => {
        avatar.rotate(input.mousePosition);
    };

    const updateLocation = (elapsedTime) => {
        const vector = {
            x: xFrom(input.move),
            y: yFrom(input.move)
        };
        avatar.move(vector, elapsedTime);
    };

    const xFrom = (moveActions) => {
        switch (moveActions.x) {
            case Actions.MOVE_LEFT:
                return -1;
            case Actions.MOVE_RIGHT:
                return 1;
            default:
                return 0;
        }
    };

    const yFrom = (moveActions) => {
        switch (moveActions.y) {
            case Actions.MOUSE_UP:
                return 1;
            case Actions.MOVE_DOWN:
                return -1;
            default:
                return 0;
        }
    };

    const fireMissile = (elapsedTime) => {
        if (missileInCoolDown) {
            missileCoolDownTimer -= elapsedTime;
            if (missileCoolDownTimer > 0) return;
            missileInCoolDown = false;
        }
        if (missileAmmo <= 0 || input.fire !== Actions.FIRE_MISSILE) return;
        missileFired = true;
        missileAmmo -= 1;
        missileInCoolDown = true;
        missileCoolDownTimer = MISSILE_COOL_DOWN;
    };

    const fireBullet = (elapsedTime) => {
        if (bulletInCoolDown) {
            bulletCoolDownTimer -= elapsedTime;
            if (bulletCoolDownTimer > 0) return;
            bulletInCoolDown = false;
        }
        if (bulletAmmo <= 0 || input.fire !== Actions.FIRE_BULLET) return;
        bulletFired = true;
        bulletAmmo -= 1;
        bulletInCoolDown = true;
        bulletCoolDownTimer = BULLET_COOL_DOWN;
    };

    self.respawn = (newSpawnPoint, buildingData) => {
        avatar = null;
        spawnPoint = newSpawnPoint;
        health = FULL_HEALTH;
        countdown = COUNTDOWN_TIME;
        missileAmmo = MAX_MISSILE_AMMO / 2;
        bulletAmmo = MAX_BULLET_AMMO / 2;
        missileInCoolDown = false;
        bulletInCoolDown = false;
        client.respawn(spawnPoint, buildingData);
        self.update = updateCountdown;
    };

    self.sendPlayerUpdate = () => {
        if (!input || !self.hasAvatar()) return;
        client.sendPlayerState(ownState());
    };

    const ownState = () => {
        return {
            transform     : avatar.getTransform(),
            score         : score,
            health        : health,
            missileAmmo   : missileAmmo,
            bulletAmmo    : bulletAmmo,
            sequenceNumber: input.sequenceNumber
        };
    };

    self.ownData = () => {
        return {
            id         : id,
            transform  : avatar.getTransform(),
            missileAmmo: missileAmmo
        };
    };

    self.sendGameState = (gameState) => {
        const personalUpdate = personalUpdateFrom(gameState);
        return client.sendGameState(personalUpdate);
    };

    const personalUpdateFrom = (gameState) => {
        const personalUpdate = Object.assign({}, gameState);
        personalUpdate.enemies = getEnemiesFrom(gameState);
        personalUpdate.missiles = getMissilesFrom(gameState);
        personalUpdate.bullets = getBulletsFrom(gameState);
        personalUpdate.powerUps = getPowerUpsFrom(gameState);
        personalUpdate.score = score;
        delete personalUpdate.playerData;
        return personalUpdate;
    };

    const getEnemiesFrom = (gameState) => {
        return gameState.playerData.filter(isNotSelf).filter(isNearby);
    };

    const isNotSelf = (playerData) => playerData.id !== id;

    const getMissilesFrom = (gameState) => {
        return gameState.missiles.filter(isNearby);
    };

    const getBulletsFrom = (gameState) => {
        return gameState.bullets.filter(isNearby);
    };

    const getPowerUpsFrom = (gameState) => {
        return gameState.powerUps.filter(isNearby);
    };

    const isNearby = (otherData) => {
        const thisLocation = avatar ? avatar.getTransform() : spawnPoint;
        const otherLocation = otherData.transform;
        const between = distanceBetween(thisLocation, otherLocation);
        return between < 2000;
    };

    const distanceBetween = (a, b) => {
        return Math.sqrt(a.x * b.x + a.y * b.y);
    };

    self.hasAvatar = () => Boolean(avatar);

    self.damage = (value) => health -= value;

    self.heal = () => {
        health += HEAL_RATE;
        if (health > FULL_HEALTH) health = FULL_HEALTH;
    };

    self.addMissile = () => {
        missileAmmo += 1;
        if (missileAmmo > MAX_MISSILE_AMMO) missileAmmo = MAX_MISSILE_AMMO;
    };

    self.addBullets = () => {
        bulletAmmo += BULLET_BUNDLE;
        if (bulletAmmo > MAX_BULLET_AMMO) bulletAmmo = MAX_BULLET_AMMO;
    };

    self.projectilesFired = () => {
        return {
            transform   : avatar.getTransform(),
            missileFired: missileFired,
            bulletFired : bulletFired
        };
    };

    self.isDead = () => health <= 0;

    self.id = () => id;

    self.isLoggedIn = () => client.isLoggedIn();

    self.award = (points) => score += points;

    self.getTransform = () => avatar.getTransform();

    self.previousTransform = () => avatar.previousTransform();

    self.saveTransform = () => avatar.saveTransform();

    self.endGame = () => {
        scoreRepo.add({username: client.username(), score: score});
        client.endGame();
    };

    return self;

};
