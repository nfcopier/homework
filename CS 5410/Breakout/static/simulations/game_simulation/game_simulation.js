export default function (
    Paddle,
    Ball,
    Difficulties,
    Actions
) {

const Multipliers = {
    EASY: 0.5,
    NORMAL: 1,
    HARD: 2
};

const PADDLE_SCORE = -100;

return function GameSimulation(difficulty) {

    const self = {};

    self.transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    let paddle = null;
    let balls = [];
    let countdown = null;
    let scoreMultiplier = null;
    let otherAction = Actions.NONE;
    let gameTime = 0;
    let paddleCount = 3;
    let score = 0;
    let gameOver = false;

    updateDifficulty();
    resetPaddle();
    resetCountdown();

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

    function resetPaddle() {
        paddle = Paddle( self.transform, difficulty );
        balls = [Ball( paddle.transform, difficulty )];
    }

    function resetCountdown() {
        self.update = updateCountdown;
        countdown = 3000;
    }

    function updateCountdown (actions, elapsedTime) {
        otherAction = actions.other;
        countdown -= elapsedTime;
        if (countdown <= 0) self.update = updateGame;
    }

    function updateGame (actions, elapsedTime) {
        otherAction = actions.other;
        if (gameOver) return;
        gameTime += elapsedTime;
        updatePlayerDirection( actions.move);
        paddle.update( elapsedTime );
        updateBalls(elapsedTime);
    }

    const updateBalls = function (elapsedTime) {
        for (let ball of balls) {
            ball.update(elapsedTime);
            checkWallCollisionsWith(ball);
        }
    };

    const checkWallCollisionsWith = function (ball) {
        if (ball.transform.y >= self.transform.height)
            losePaddle();
        if (ball.transform.x <= self.transform.x)
            ball.collideAt({x: 1, y: 0});
        if (ball.transform.y <= self.transform.y) {
            paddle.half();
            ball.collideAt({x: 0, y: 1});
        }
        if (ball.transform.x + ball.transform.width >= self.transform.x + self.transform.width)
            ball.collideAt({x: -1, y: 0});
    };

    const checkPaddleCollisions = function () {
        // what do I do here?
    };

    const losePaddle = function () {
        score += scoreMultiplier * PADDLE_SCORE;
        if (score < 0) score = 0;
        paddleCount -= 1;
        if (paddleCount <= 0) {
            gameOver = true;
            return;
        }
        resetPaddle();
        resetCountdown();
    };

    const updatePlayerDirection = function (moveAction) {
        switch(moveAction) {
            case Actions.MOVE_LEFT:
                return paddle.moveLeft();
            case Actions.MOVE_RIGHT:
                return paddle.moveRight();
            case Actions.STOP_PADDLE:
                return paddle.stop();
        }
    };

    self.getAction = function () { return otherAction; };

    self.getPaddle = function () { return paddle; };

    self.getBalls = function () { return balls; };

    self.getScore = function () { return score; };

    self.getCountdown = function () {
        return {
            value: countdown,
            transform: self.transform
        };
    };

    self.getPaddleCount = function () { return paddleCount; };

    self.isGameOver = function () { return gameOver; };

    self.setDifficulty = function (newDifficulty) {
        difficulty = newDifficulty;
        updateDifficulty();
        paddle.setDifficulty( difficulty );
        for (let ball of balls)
            ball.setDifficulty( difficulty );
    };

    return self;

}

}
