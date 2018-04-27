module.exports = function (
    Player,
    gameObjects,
    maps
) {

const BUBBLE_COUNTDOWN = 2 * 60 * 1000;

return function GameSimulation(clients) {

    const transform = {
        width: 1500,
        height: 1500
    };

    const self = {};

    let map = maps[Math.floor(Math.random()*maps.length)](transform);

    let players = [];
    let gameState = {
        bubble: {
            x: 0,
            y: 0,
            width: transform.width*2,
            height: transform.height*2,
            radius: Math.min( transform.width, transform.height ),
            countdown: BUBBLE_COUNTDOWN
        },
        gameTime: 0
    };

    let projectiles = [];

    self.update = function(elapsedTime) {
        clients.justLoggedIn().forEach( addPlayer );
        verifyGameIntegrity();
        if (players.length < 1) return;
        gameState.gameTime += elapsedTime;
        players = players.filter( isLoggedIn );
        doBubbleUpdate( elapsedTime );
        players.filter( hasAvatar ).forEach( saveTransform );
        projectiles.forEach( saveTransform );
        players.forEach( doUpdate(elapsedTime) );
        projectiles.forEach( doUpdate(elapsedTime) );
        players.filter( hasAvatar ).filter( isOutsideBubble ).forEach( doBubbleDamage(elapsedTime) );
        map.powerUps().forEach( doUpdate( elapsedTime ) );
        map.powerUps().forEach( doPlayerCollisions );
        map.buildings().forEach( doPlayerCollisions );
        map.buildings().forEach( doProjectileCollisions );
        projectiles.forEach( doPlayerCollisions );
        projectiles.forEach( doProjectileCollisions );
        projectiles = projectiles.filter( isStillActive );
        players.filter( isDead ).forEach( endGame );
        players.filter( hasAvatar ).forEach( spawnProjectiles );
        gameState.playerData = players.filter( hasAvatar ).map( playerData );
        gameState.elapsedTime = elapsedTime;
        gameState.missiles = projectiles.filter( isMissile ).map( projectileData );
        gameState.bullets = projectiles.filter( isBullet ).map( projectileData );
        gameState.powerUps = map.powerUps().map( powerUpData ).filter( notNull ) ;
        gameState.playersRemaining = players.length;
        players.forEach( send(gameState) );
    };

    const addPlayer = function (client) {
        if (gameState.gameTime > 2 * 60 * 1000) return;
        const player = Player(client);
        players.push(player);
        respawn( player )
    };

    const isLoggedIn = (player) => player.isLoggedIn();

    const verifyGameIntegrity = function () {
        if (!(
            gameState.bubble.radius < 1 ||
            !players.length ||
            gameState.gameTime > 2 * 60 * 1000 && players.length < 2
        )) return;
        players.forEach( endGame );
        players = [];
        gameState.bubble.radius = Math.min( transform.width, transform.height );
        gameState.gameTime = 0;
    };

    const doBubbleUpdate = function (elapsedTime) {
        gameState.bubble.countdown -= elapsedTime;
        if (gameState.bubble.countdown > 0) return;
        gameState.bubble.radius /= 2;
        gameState.bubble.countdown = BUBBLE_COUNTDOWN;
    };

    const saveTransform = (gameObject) => gameObject.saveTransform();

    const doUpdate = (elapsedTime) => (gameObject) =>
        gameObject.update( elapsedTime );

    const isOutsideBubble = function (player) {
        const transform = player.getTransform();
        const distanceFromCenter = transform.x*transform.x + transform.y*transform.y;
        const bubbleRadius = gameState.bubble.radius*gameState.bubble.radius;
        return distanceFromCenter > bubbleRadius;
    };

    const doBubbleDamage = (elapsedTime) => (player) => player.damage( 1/150 * elapsedTime );

    const doPlayerCollisions = function(gameObject) {
        for (let player of players.filter( hasAvatar ))
            gameObject.doCollisionWithPlayer( player );
    };

    const doProjectileCollisions = function (gameObject) {
        for (let projectile of projectiles)
            gameObject.doCollisionWithProjectile( projectile );
    };

    const isStillActive = (projectile) => projectile.isActive ();

    const isDead = (player) => player.isDead();

    const respawn = function(player) {
        player.respawn( map.randomSpawnPoint(), map.buildingData() );
    };

    const spawnProjectiles = function (player) {
        const projectiles = player.projectilesFired();
        if (projectiles.bulletFired)
            spawnBullet( player, projectiles.transform );
        if (projectiles.missileFired)
            spawnMissile( player, projectiles.transform );
    };

    const spawnBullet = function (owner, transform) {
        projectiles.push( gameObjects.Bullet(owner, transform) )
    };

    const spawnMissile = function (owner, transform) {
        projectiles.push( gameObjects.Missile(owner, transform) )
    };

    const hasAvatar = (player) => player.hasAvatar();

    const endGame = (player) => player.endGame();

    const playerData = (player) => player.ownData();

    const projectileData = (projectile) => projectile.ownData();

    const powerUpData = (powerUp) => powerUp.data();

    const isMissile = (projectile) => projectile.isMissile();
    const isBullet = (projectile) => projectile.isBullet();

    const notNull = (object) => !!object;

    const send = (gameState) => function (player) {
        player.sendPlayerUpdate();
        player.sendGameState( gameState )
    };

    return self;

}

};
