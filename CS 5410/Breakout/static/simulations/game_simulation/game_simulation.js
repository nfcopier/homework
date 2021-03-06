export default function (
    gameObjects,
    collisionSystems,
    ParticleSystem,
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

const GROUP_SPECS = [
    { color: "green", pointValue: 5 },
    { color: "blue", pointValue: 3 },
    { color: "orange", pointValue: 2 },
    { color: "yellow", pointValue: 1 }
];

const BRICK_MILESTONES = [ 4, 12, 36, 62 ];

const PADDLE_POINT_VALUE = -10;
const BALL_POINT_VALUE = -2;
const GROUP_TOP_MARGIN = 100;
const INITIAL_PADDLE_COUNT = 3;
const POINTS_FOR_NEW_BALL = 100;

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
    const particleSystem = new ParticleSystem();
    let paddle = null;
    let balls = [];
    let countdown = null;
    let scoreMultiplier = null;
    let currentBrickMilestone = null;
    let otherAction = Actions.NONE;
    let gameTime = 0;
    let paddleCount = INITIAL_PADDLE_COUNT;
    let score = 0;
    let gameOver = false;
    let brokenBrickCount = 0;
    let difficulty = difficultyRepo.getDifficulty();
    let frameCount = 0;
    let fps = 0;
    let timeSinceLastCheck = 0;
    let topGroup = null;

    resetGame();

    function resetGame() {
        createRowGroups();
        resetPaddle();
        resetCountdown();
        updateDifficulty();
        particleSystem.reset();
    }

    function createRowGroups () {
        let y = transform.y + GROUP_TOP_MARGIN;
        topGroup = gameObjects.RowGroup( GROUP_SPECS[0], y, transform);
        self.addChild( topGroup );
        y += topGroup.getTransform().height;
        for (let groupSpec of GROUP_SPECS.slice(1)) {
            const group = gameObjects.RowGroup(groupSpec, y, transform);
            self.addChild( group );
            y += group.getTransform().height;
        }
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
        paddle = gameObjects.Paddle( transform, difficulty );
        balls = [ createBall() ];
        currentBrickMilestone = 0;
        brokenBrickCount = 0;
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
        paddle.update( elapsedTime );
        particleSystem.update( elapsedTime );
        const topRowBricksBefore = topGroup.getTopBrickCount();
        updateBalls( elapsedTime );
        const topRowBricksAfter = topGroup.getTopBrickCount();
        const topBrickBroken = topRowBricksAfter < topRowBricksBefore;
        if (topBrickBroken) paddle.half();
        checkBrickMilestone();
        if (!self.hasChildren()) resetGame();
    }

    const updateFps = function (elapsedTime) {
        frameCount += 1;
        timeSinceLastCheck += elapsedTime;
        if (timeSinceLastCheck < 1000) return;
        fps = frameCount;
        frameCount = 0;
        timeSinceLastCheck = 0;
    };

    const updateBalls = function (elapsedTime) {
        for (let ball of balls) {
            ball.update( elapsedTime );
            checkWallCollisionWith( ball );
            checkPaddleCollisionWith( ball );
            checkBrickCollisionsWith( ball );
        }
    };

    const checkWallCollisionWith = function (ball) {
        if (ball.transform.y >= transform.height)
            removeBall( ball );
        if (ball.transform.x <= transform.x)
            ball.collideAt({x: 1, y: 0});
        if (ball.transform.y <= transform.y)
            ball.collideAt({x: 0, y: 1});
        if (ball.transform.x + ball.transform.width >= transform.x + transform.width)
            ball.collideAt({x: -1, y: 0});
    };

    const removeBall = function (ball) {
        const ballIndex = balls.indexOf( ball );
        balls.splice( ballIndex, 1 );
        incrementScore( BALL_POINT_VALUE );
        if (balls.length <= 0)
            losePaddle();
    };

    const losePaddle = function () {
        paddleCount -= 1;
        if (paddleCount <= 0) {
            gameOver = true;
            scoreRepo.add( score );
        } else {
            incrementScore( PADDLE_POINT_VALUE );
            resetPaddle();
            resetCountdown();
        }
    };

    const checkPaddleCollisionWith = function (ball) {
        const paddleTransform = paddle.getTransform();
        if (!ball.hasCollidedWith(paddleTransform)) return;
        const incidenceAngle = getIncidenceAngleBetween( ball, paddleTransform );
        ball.setDirection( incidenceAngle );
    };

    const checkBrickCollisionsWith = function (ball) {
        const collisionSystem =
                  collisionSystems.BrickSystem( ball, self, particleSystem );
        collisionSystem.run();
        const newPoints = collisionSystem.scoreCollisions();
        brokenBrickCount += collisionSystem.getBrokenBricks();
        if (newPoints !== 0) incrementScore( newPoints );
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

    function checkBrickMilestone() {
        const milestone = BRICK_MILESTONES[currentBrickMilestone];
        const passedMilestone =
            currentBrickMilestone < BRICK_MILESTONES.length &&
            brokenBrickCount > milestone;
        if (!passedMilestone) return;
        currentBrickMilestone += 1;
        if (difficulty === Difficulties.EASY) return;
        if (difficulty === Difficulties.NORMAL)
            balls[0].incrementSpeed();
        if (difficulty === Difficulties.HARD)
            for (let ball of balls)
                ball.incrementSpeed();
    }

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

    const incrementScore = function (newPoints) {
        let earnedBallCount = newPoints < 100 ? 0 : Math.floor( newPoints / 100);
        const oldScoreRemainder = score % POINTS_FOR_NEW_BALL;
        score += scoreMultiplier * newPoints;
        const newScoreRemainder = score % POINTS_FOR_NEW_BALL;
        const newBallEarned =
            newPoints > 0 && newScoreRemainder < oldScoreRemainder;
        if (newBallEarned) earnedBallCount += 1;
        for (let i = 0; i < earnedBallCount; i++)
            balls.push( createBall() );
         if (score <= 0) score = 0;
    };

    function createBall() {
        return gameObjects.Ball(paddle.getTransform(), difficulty);
    }

    self.getAction = function () { return otherAction; };

    self.getPaddle = function () { return paddle; };

    self.getBalls = function () { return balls; };

    self.getScore = function () { return score; };

    self.getCountdown = function () {
        return {
            value: countdown,
            transform: transform
        };
    };

    self.getPaddleCount = function () { return paddleCount; };

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

    self.getParticleEffects = function () { return particleSystem.getEffects(); };

    return self;

}

}
