export default function (
    Difficulties
) {

const BALL_RADIUS = 7.5;
const SPEED_INCREMENT = 0.05;
const MAX_SPEED = 2;

const Speeds = {
    EASY: 0.25,
    NORMAL: 0.3,
    HARD: 0.35
};

return function (paddleTransform, difficulty) {

    const self = {};

    const velocity = {
        x: 0.1736,
        y: -0.9848
    };

    self.transform = {
        x: getX(),
        y: getY(),
        theta: 0,
        width: BALL_RADIUS * 2,
        height: BALL_RADIUS * 2
    };

    let speedIncrementCount = 0;

    updateDifficulty();

    function getX() {
        const center = paddleTransform.x + paddleTransform.width / 2;
        return center - BALL_RADIUS;
    }

    function getY() {
        return paddleTransform.y - BALL_RADIUS * 2;
    }

    self.setDirection = function (newDirection) {
        const speed = Math.sqrt( velocity.x*velocity.x + velocity.y*velocity.y );
        velocity.x = speed * newDirection.x;
        velocity.y = speed * newDirection.y;
    };

    self.adjustX = function (xDiff) {
        velocity.x = -velocity.x;
        self.transform.x += 2*xDiff;
    };

    self.adjustY = function (yDiff) {
        velocity.y = -velocity.y;
        self.transform.y += 2*yDiff;
    };

    self.collideAt = function (angle) {
        const parallelMag = angle.x*velocity.x + angle.y*velocity.y;
        velocity.x -= 2*parallelMag*angle.x;
        velocity.y -= 2*parallelMag*angle.y;
    };

    self.update = function (elapsedTime) {
        self.transform.x += velocity.x * elapsedTime;
        self.transform.y += velocity.y * elapsedTime;
    };

    self.incrementSpeed = function() {
        speedIncrementCount += 1;
        const currentSpeed = calculateCurrentSpeed();
        const newSpeed = currentSpeed + SPEED_INCREMENT;
        setSpeed( newSpeed );
    };

    self.setDifficulty = function (newDifficulty) {
        difficulty = newDifficulty;
        updateDifficulty();
    };

    function updateDifficulty() {
        const baseSpeed = getBaseSpeed();
        const newSpeed = baseSpeed + speedIncrementCount * SPEED_INCREMENT;
        setSpeed( newSpeed );
    }

    function getBaseSpeed() {
        switch (difficulty) {
            case Difficulties.EASY:
                return Speeds.EASY;
            case Difficulties.NORMAL:
                return Speeds.NORMAL;
            case Difficulties.HARD:
                return Speeds.HARD;
        }
    }

    function calculateCurrentSpeed() {
        return Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    }

    self.hasCollidedWith = function (otherTransform) {
        const selfBounds = getBoundsFrom( self.transform );
        const otherBounds = getBoundsFrom( otherTransform );
        return (
            selfBounds.left < otherBounds.right &&
            selfBounds.right > otherBounds.left &&
            selfBounds.top < otherBounds.bottom &&
            selfBounds.bottom > otherBounds.top
        )
    };

    const getBoundsFrom = function( transform ) {
        return {
            left: transform.x,
            right: transform.x + transform.width,
            top: transform.y,
            bottom: transform.y + transform.height
        };
    };

    self.getCenter = function () {
        return {
            x: self.transform.x + BALL_RADIUS,
            y: self.transform.y + BALL_RADIUS
        };
    };

    function setSpeed(speed) {
        if (speed > MAX_SPEED) speed = MAX_SPEED;
        const direction = unitize( velocity );
        velocity.x = speed * direction.x;
        velocity.y = speed * direction.y;
    }

    function unitize (vector) {
        const mag = Math.sqrt( vector.x * vector.x + vector.y * vector.y );
        return { x: vector.x / mag, y: vector.y / mag };
    }

    return self;

}

}
