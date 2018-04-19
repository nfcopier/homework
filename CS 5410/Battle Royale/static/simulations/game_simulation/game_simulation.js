export default function (
    gameObjects,
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
    let playerState = {};
    let countdown = null;
    let otherAction = Actions.NONE;
    let gameOver = false;
    let frameCount = 0;
    let fps = 0;
    let timeSinceLastCheck = 0;
    let gameState = {};

    const updateGame = self.update = function(actions, input, elapsedTime) {
        if (input.gameState) gameState = input.gameState;
        if (input.respawn) return respawn( input.respawn );
        if (input.playerState) playerState = input.playerState;
    };

    const respawn = function(location) {
        self.update = updateCountdown;
        countdown = 3000;
    };

    const updateCountdown = function(actions, input, elapsedTime) {
        if (input.gameState) gameState = input.gameState;
        if (input.playerState) return startGame( input, elapsedTime );
        otherAction = actions.other;
        countdown -= elapsedTime;
        updateFps( elapsedTime );
        particleSystem.update( elapsedTime );
    };

    const startGame = function (input, elapsedTime) {
        self.update = updateGame;
        self.update( {}, input, elapsedTime )
    };

    const updateFps = function (elapsedTime) {
        frameCount += 1;
        timeSinceLastCheck += elapsedTime;
        if (timeSinceLastCheck < 1000) return;
        fps = frameCount;
        frameCount = 0;
        timeSinceLastCheck = 0;
    };

    self.getAction = function () { return otherAction; };

    self.getAvatars = () => playerState.transform ? [gameObjects.Avatar(playerState.transform)] : [];

    self.getScore = function () { return 0; };

    self.getCountdown = function () {
        return {
            value: countdown,
            transform: transform
        };
    };

    self.getAnalytics = function () {
        return {
            fps: fps,
            gameTime: gameState.gameTime
        };
    };

    self.isGameOver = function () { return gameOver; };

    self.getParticleEffects = function () { return particleSystem.getEffects(); };

    return self;

}

}
