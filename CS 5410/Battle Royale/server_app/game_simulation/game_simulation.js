module.exports = function (
    Player,
    gameObjects,
    maps
) {

return function GameSimulation(clients) {

    const transform = {
        width: 1024,
        height: 768
    };

    const self = {};

    let map = maps[Math.floor(Math.random()*maps.length)]();

    let players = [];
    let gameState = {
        bubble: {
            x: transform.width / 2,
            y: transform.height / 2,
            radius: Math.min( transform.width, transform.height )
        },
        gameTime: 0
    };

    let projectiles = [];

    self.update = function(elapsedTime) {
        gameState.gameTime += elapsedTime;
        clients.justLoggedIn().forEach( addPlayer );
        players = players.filter( isLoggedIn );
        players.filter( hasAvatar ).forEach( saveTransform );
        projectiles.forEach( saveTransform );
        players.forEach( doUpdate(elapsedTime) );
        projectiles.forEach( doUpdate(elapsedTime) );
        map.buildings().forEach( doPlayerCollisions(elapsedTime) );
        projectiles.forEach( doPlayerCollisions() );
        projectiles.forEach( doProjectileCollisions() );
        projectiles = projectiles.filter( isStillActive );
        players.filter( isDead ).forEach( respawn );
        players.filter( hasAvatar ).forEach( spawnProjectiles );
        gameState.playerData = players.filter( hasAvatar ).map( playerData );
        gameState.elapsedTime = elapsedTime;
        gameState.missiles = projectiles.filter( isMissile ).map( projectileData );
        gameState.bullets = projectiles.filter( isBullet ).map( projectileData );
        players.forEach( send(gameState) );
    };

    const addPlayer = function (client) {
        const player = Player(client);
        players.push(player);
        respawn( player )
    };

    const isLoggedIn = (player) => player.isLoggedIn();

    const saveTransform = (gameObject) => gameObject.saveTransform();

    const doUpdate = (elapsedTime) => (gameObject) =>
        gameObject.update( elapsedTime );

    const doPlayerCollisions = (elapsedTime) => function(gameObject) {
        for (let player of players.filter( hasAvatar ))
            gameObject.doCollisionWithPlayer( player, elapsedTime );
    };

    const doProjectileCollisions = (elapsedTime) => function (gameObject) {
        for (let projectile of projectiles)
            gameObject.doCollisionWithProjectile( projectile, elapsedTime );
    };

    const isStillActive = (projectile) => projectile.isActive();

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

    const projectileData = (projectile) => projectile.ownData();

    const playerData = (player) => player.ownData();

    const isMissile = (projectile) => projectile.isMissile();
    const isBullet = (projectile) => projectile.isBullet();

    const send = (gameState) => function (player) {
        player.sendPlayerUpdate();
        player.sendGameState( gameState )
    };

    return self;

}

};
