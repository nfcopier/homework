export default function (
    gameObjects,
    StatePredictor,
    collisionSystems,
    ParticleSystem,
    Actions
) {

return function GameSimulation() {

    const transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    const self = gameObjects.GameObject( transform );

    const particleSystem = new ParticleSystem();
    let predictor;
    let countdown = null;
    let otherAction = Actions.NONE;
    let gameOver = false;
    let frameCount = 0;
    let fps = 0;
    let timeSinceLastCheck = 0;
    let gameState = {};
    let enemies = [];
    let missiles = [];
    let bullets = [];
    let buildings;
    let extents;

    self.update = function(actions, input, elapsedTime) {
        if (input.loggedout) gameOver = true;
        if (gameOver) return;
        updateGameWorld( actions, input, elapsedTime );
        updateSelf( actions, input, elapsedTime );
    };

    const updateGameWorld = function (actions, input, elapsedTime) {
        updateFps( elapsedTime );
        otherAction = actions.other;
        if (input.gameState) updateGameState( input.gameState );
        enemies.forEach( doInterpolation(elapsedTime) );
        particleSystem.update( elapsedTime );
    };

    const updateAvatar = function(actions, input, elapsedTime) {
        if (input.respawn) return respawn( input.respawn );
        if (input.playerState) predictor.setKnown( input.playerState );
        predictor.update( actions, elapsedTime );
    };
    let updateSelf = updateAvatar;

    const updateFps = function (elapsedTime) {
        frameCount += 1;
        timeSinceLastCheck += elapsedTime;
        if (timeSinceLastCheck < 1000) return;
        fps = frameCount;
        frameCount = 0;
        timeSinceLastCheck = 0;
    };

    const updateGameState = function (newGameState) {
        newGameState.enemies.forEach( updateGoal(newGameState.elapsedTime) );
        enemies = enemies.filter( stillExistsIn( newGameState.enemies) );
        gameState = newGameState;
        missiles = gameState.missiles;
        bullets = gameState.bullets;
    };

    const updateGoal = function (updateWindow) {
        const enemyObject = enemies.reduce( toObject, {} );
        return function (newEnemy) {
            if (!updateWindow) return;
            const currentEnemy = enemyObject[newEnemy.id];
            if (!currentEnemy) {
                enemies.push( newEnemy );
            } else {
                currentEnemy.goalWindow = updateWindow;
                currentEnemy.goalTransform = newEnemy.transform;
            }
        };
    };

    const stillExistsIn = function (newEnemies) {
        const enemyObject = newEnemies.reduce( toObject, {} );
        return (enemy) => enemyObject[enemy.id];
    };

    const toObject = function(accumulated, enemy) {
        accumulated[enemy.id] = enemy;
        return accumulated;
    };

    const doInterpolation = (elapsedTime) => function (enemy) {
        if (!enemy.goalWindow || !enemy.goalTransform) return;
        const increment = elapsedTime / enemy.goalWindow;
        if (!increment) return;
        enemy.transform.x += (enemy.goalTransform.x  - enemy.transform.x) * increment;
        enemy.transform.y += (enemy.goalTransform.y  - enemy.transform.y) * increment;
        enemy.transform.theta += (enemy.goalTransform.theta  - enemy.transform.theta) * increment;
    };

    const respawn = function({spawnPoint, buildingData}) {
        buildings = buildingData.buildings.map( toBuilding );
        extents = buildingData.extents;
        predictor = StatePredictor( spawnPoint );
        countdown = 3000;
        updateSelf = updateCountdown;
    };

    const toBuilding = (data) => gameObjects.Building( data );

    const updateCountdown = function(actions, input, elapsedTime) {
        countdown -= elapsedTime;
        if (input.playerState) return startGame( actions, input, elapsedTime );
    };

    const startGame = function (actions, input, elapsedTime) {
        countdown = 0;
        updateSelf = updateAvatar;
        updateSelf( actions, input, elapsedTime );
    };

    self.getAction = function () { return otherAction; };

    self.getAvatarState = () => predictor.state();

    self.getEnemies = () => enemies;

    self.buildings = () => buildings;

    self.extents = () => extents;

    self.playerBuildings = () => buildings.filter( (b) => predictor ? b.contains( predictor.state().transform ) : [] ).map( toData );

    self.noPlayerBuildings = () => buildings.filter( (b) => predictor ? !b.contains( predictor.state().transform ) : b ).map( toData );

    const toData = (building) => building.data;

    self.missiles = () => missiles;

    self.bullets = () => bullets;

    self.powerUps = () => gameState.powerUps;

    self.getScore = () => gameState.score;

    self.getCountdown = () => countdown;

    self.getAnalytics = function () {
        return {
            fps: fps,
            gameTime: gameState.gameTime
        };
    };

    self.bubbleData = () => gameState.bubble;

    self.isGameOver = function () { return gameOver; };

    self.playerCount = () => gameState.playersRemaining;

    self.getParticleEffects = function () { return particleSystem.getEffects(); };

    return self;

};

}
