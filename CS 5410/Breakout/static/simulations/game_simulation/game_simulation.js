export default function (
    Paddle,
    Ball,
    RowGroup,
    CollisionSystem,
    ScoreRepo,
    Difficulties,
    Actions
) {

const Multipliers = {
    EASY: 0.5,
    NORMAL: 1,
    HARD: 2
};

const COLORS = [
    "green",
    "blue",
    "orange",
    "yellow"
];

const PADDLE_SCORE = -100;
const GROUP_TOP_MARGIN = 100;

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
    const scoreRepo = ScoreRepo();
    const rowGroups = createRowGroups();

    updateDifficulty();
    resetPaddle();
    resetCountdown();

    function createRowGroups () {
        let y = self.transform.y + GROUP_TOP_MARGIN;
        const results = [];
        for (let color of COLORS) {
            const group = RowGroup(color, y, self.transform);
            results.push( group );
            y += group.transform.height;
        }
        return results;
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
        updateBalls( elapsedTime );
    }

    const updateBalls = function (elapsedTime) {
        for (let ball of balls) {
            ball.update( elapsedTime );
            checkWallCollisionWith( ball );
            checkPaddleCollisionWith( ball );
            checkBrickCollisionsWith( ball );
        }
    };

    const checkWallCollisionWith = function (ball) {
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

    const checkPaddleCollisionWith = function (ball) {
        if (!ball.hasCollidedWith(paddle.transform)) return;
        const incidenceAngle = getIncidenceAngleBetween( ball, paddle.transform );
        ball.setDirection( incidenceAngle );
    };

    const checkBrickCollisionsWith = function (ball) {
        for (let group of rowGroups) {
            const collisionSystem = CollisionSystem( ball, group );
            collisionSystem.run();
        }
    };

    const getIncidenceAngleBetween = function (ball, otherTransform) {
        const ballCenter = ball.getCenter();
        const otherBounds = getBoundsFrom( otherTransform );
        if (isSideCollision(ballCenter, otherBounds))
            return sideCollision( ball, otherBounds );
        else
            return topBottomCollision( ball, otherBounds );
    };

    const isSideCollision = function (ballCenter, otherBounds) {
        return (
            ballCenter.y > otherBounds.top &&
            ballCenter.y < otherBounds.bottom &&
            (
                ballCenter.x < otherBounds.left ||
                ballCenter.x > otherBounds.right
            )
        );
    };

    const sideCollision = function (ball, otherBounds) {
        const ballCenter = ball.getCenter();
        const otherCenter = getCenterFrom( otherBounds );
        const scale = otherBounds.bottom - otherCenter.y;
        const newY = (ballCenter.y - otherCenter.y) / scale;
        let newX = ballCenter.x < otherCenter.x ? -1 : 1;
        return unitize({ x: newX, y: newY });
    };

    const topBottomCollision = function (ball, otherBounds) {
        const ballCenter = ball.getCenter();
        const otherCenter = getCenterFrom( otherBounds );
        const scale = otherBounds.right - otherCenter.x;
        const newX = (ballCenter.x - otherCenter.x) / scale;
        let newY = ballCenter.y < otherCenter.y ? -1 : 1;
        return unitize({ x: newX, y: newY });
    };

    const getBoundsFrom = function(transform) {
        return {
            left: transform.x,
            right: transform.x + transform.width,
            top: transform.y,
            bottom: transform.y + transform.height
        };
    };

    const getCenterFrom = function(bounds) {
        return {
            x: (bounds.left + bounds.right) / 2,
            y: (bounds.top + bounds.bottom) / 2
        }
    };

    const unitize = function (vector) {
        const mag = Math.sqrt( vector.x * vector.x + vector.y * vector.y );
        return { x: vector.x / mag, y: vector.y / mag };
    };

    const losePaddle = function () {
        score += scoreMultiplier * PADDLE_SCORE;
        if (score < 0) score = 0;
        paddleCount -= 1;
        if (paddleCount <= 0) {
            gameOver = true;
            scoreRepo.add( score );
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

    self.getRowGroups = function () { return rowGroups; };

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
