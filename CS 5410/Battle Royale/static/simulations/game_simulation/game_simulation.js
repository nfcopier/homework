export default function (
    gameObjects,
    collisionSystems,
    ParticleSystem,
    ScoreRepo,
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

    const scoreRepo = ScoreRepo();
    const particleSystem = new ParticleSystem();
    let countdown = null;
    let otherAction = Actions.NONE;
    let gameTime = 0;
    let score = 0;
    let gameOver = false;
    let frameCount = 0;
    let fps = 0;
    let timeSinceLastCheck = 0;

    resetGame();

    function resetGame() {
        resetCountdown();
        particleSystem.reset();
    }

    function resetCountdown() {
        self.update = updateCountdown;
        countdown = 3000;
    }

    function updateCountdown (actions, elapsedTime) {
        otherAction = actions.other;
        countdown -= elapsedTime;
        gameTime += elapsedTime;
        updateFps( elapsedTime );
        particleSystem.update( elapsedTime );
        if (countdown <= 0) self.update = updateGame;
    }

    function updateGame (actions, elapsedTime) {
        otherAction = actions.other;
        if (gameOver) return;
        gameTime += elapsedTime;
        updateFps( elapsedTime );
        updatePlayerDirection( actions.move );
        particleSystem.update( elapsedTime );
    }

    const updateFps = function (elapsedTime) {
        frameCount += 1;
        timeSinceLastCheck += elapsedTime;
        if (timeSinceLastCheck < 1000) return;
        fps = frameCount;
        frameCount = 0;
        timeSinceLastCheck = 0;
    };

    const updatePlayerDirection = function (moveAction) {
        switch(moveAction) {
            case Actions.MOVE_LEFT:
                return ;
            case Actions.MOVE_RIGHT:
                return ;
            case Actions.STOP_PADDLE:
                return ;
        }
    };

    self.getAction = function () { return otherAction; };

    self.getScore = function () { return score; };

    self.getCountdown = function () {
        return {
            value: countdown,
            transform: transform
        };
    };

    self.getAnalytics = function () {
        return {
            fps: fps,
            gameTime: gameTime
        };
    };

    self.isGameOver = function () { return gameOver; };

    self.getParticleEffects = function () { return particleSystem.getEffects(); };

    return self;

}

}
