export default function (
    gameObjects,
    ScoreRepo,
    DifficultyRepo,
    Difficulties,
    Directions,
    Actions
) {

const ROW_COUNT = 48;
const COLUMN_COUNT = 64;

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
    const squareFactory = gameObjects.SquareFactory( ROW_COUNT, COLUMN_COUNT, transform );
    const obstacles = gameObjects.Obstacles( squareFactory );
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
    let food = null;
    let snake = null;

    const init = function() {
        resetGame();
    };

    function resetGame() {
        snake = createSnake();
        food = [createFood()];
        resetCountdown();
        updateDifficulty();
    }

    const createSnake = function () {
        const snakeHead = squareFactory.spawnRandom();
        if (obstacles.intersects(snakeHead))
            return createSnake();
        return gameObjects.Snake(squareFactory, snakeHead);
    };

    const createFood = function() {
        const food = squareFactory.spawnRandom();
        if (obstacles.intersects( food ))
            return createFood;
        if (snake.intersects([food]))
            return createFood();
        return food;
    };

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
        snake.update( elapsedTime );
        checkFoodEaten();
        checkObstacleHit();
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
                return snake.turn( Directions.LEFT );
            case Actions.MOVE_RIGHT:
                return snake.turn( Directions.RIGHT );
            case Actions.MOVE_UP:
                return snake.turn( Directions.TOP );
            case Actions.MOVE_DOWN:
                return snake.turn( Directions.BOTTOM );
        }
    };

    const checkFoodEaten = function() {
        if (!snake.intersects(food)) return;
        snake.grow();
        food = [createFood()];
        score += 10;
    };

    const checkObstacleHit = function () {
        if (snake.intersects(obstacles.children()))
            endGame();
        if (snake.exceeds( ROW_COUNT, COLUMN_COUNT ))
            endGame();
    };

    const endGame = function() {
        scoreRepo.add( score );
        gameOver = true;
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

    self.getFood = function() {
        return food.map( f => f.getTransform() );
    };

    self.getObstacles = function() {
        return obstacles.children().map( o => o.getTransform());
    };

    self.getSnakeSegments = function() {
        return snake.segments().map( s => s.getTransform() );
    };

    self.isGameOver = function () { return gameOver; };

    self.updateDifficulty = function () {
        difficulty = difficultyRepo.getDifficulty();
        updateDifficulty();
        paddle.setDifficulty( difficulty );
        for (let ball of balls)
            ball.setDifficulty( difficulty );
    };

    init();

    return self;

}

}
