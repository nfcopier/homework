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

    const updateGame = self.update = function(actions, input, elapsedTime) {
        updateFps( elapsedTime );
        otherAction = actions.other;
        if (input.gameState) gameState = input.gameState;
        if (input.respawn) return respawn( input.respawn );
        if (input.playerState) predictor.setKnown( input.playerState );
        predictor.update( actions, elapsedTime );
    };

    const respawn = function(location) {
        predictor = StatePredictor( location );
        countdown = 3000;
        self.update = updateCountdown;
    };

    const updateCountdown = function(actions, input, elapsedTime) {
        updateFps( elapsedTime );
        otherAction = actions.other;
        if (input.gameState) gameState = input.gameState;
        countdown -= elapsedTime;
        particleSystem.update( elapsedTime );
        if (input.playerState) return startGame( actions, input, elapsedTime );
    };

    const startGame = function (actions, input, elapsedTime) {
        countdown = 0;
        self.update = updateGame;
        self.update( actions, input, elapsedTime )
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

    self.getPlayerState = () => predictor.state();

    self.getAvatars = () => [];

    self.getCountdown = () => countdown;

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
