export default function (
    gameObjects,
    ScoreRepo,
    DifficultyRepo,
    Difficulties,
    Actions
) {

const Multipliers = {
    EASY: 0.5,
    NORMAL: 1,
    HARD: 1.5
};

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
    const difficultyRepo = DifficultyRepo();
    let countdown = null;
    let scoreMultiplier = null;
    let otherAction = Actions.NONE;
    let gameTime = 0;
    let score = 0;
    let gameOver = false;
    let difficulty = difficultyRepo.getDifficulty();
    let frameCount = 0;
    let fps = 0;
    let timeSinceLastCheck = 0;

    resetGame();

    function resetGame() {
        resetCountdown();
        updateDifficulty();
    }

    function updateDifficulty() {
        switch (difficulty) {
            case Difficulties.EASY:
                return setToEasy();
            case Difficulties.NORMAL:
                return setToNormal();
            case Difficulties.HARD:
                return setToHard();
        }
    }

    function setToEasy() {
        scoreMultiplier = Multipliers.EASY;
    }

    function setToNormal() {
        scoreMultiplier = Multipliers.NORMAL;
    }

    function setToHard() {
        scoreMultiplier = Multipliers.HARD;
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
        if (countdown <= 0) self.update = updateGame;
    }

    function updateGame (actions, elapsedTime) {
        otherAction = actions.other;
        if (gameOver) return;
        gameTime += elapsedTime;
        updateFps( elapsedTime );
        updatePlayerDirection( actions.move );
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
                return;
            case Actions.MOVE_RIGHT:
                return;
            case Actions.MOVE_UP:
                return;
            case Actions.MOVE_DOWN:
                return;
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

    self.updateDifficulty = function () {
        difficulty = difficultyRepo.getDifficulty();
        updateDifficulty();
        paddle.setDifficulty( difficulty );
        for (let ball of balls)
            ball.setDifficulty( difficulty );
    };

    return self;

}

}
