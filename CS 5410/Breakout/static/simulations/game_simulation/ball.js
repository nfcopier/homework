export default function (
    Difficulties
) {

const BALL_RADIUS = 7.5;
const Speeds = {
    EASY: 0.3,
    NORMAL: 0.5,
    HARD: 0.75
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

    updateDifficulty();

    function getX() {
        const center = paddleTransform.x + paddleTransform.width / 2;
        return center - BALL_RADIUS;
    }

    function getY() {
        return paddleTransform.y - BALL_RADIUS * 2;
    }

    function updateDifficulty() {
        const newSpeed = getNewSpeed();
        const oldSpeed = Math.sqrt( velocity.x*velocity.x + velocity.y*velocity.y );
        const ratio = newSpeed / oldSpeed;
        velocity.x *= ratio;
        velocity.y *= ratio;
    }

    function getNewSpeed() {
        switch (difficulty) {
            case Difficulties.EASY:
                return Speeds.EASY;
            case Difficulties.NORMAL:
                return Speeds.NORMAL;
            case Difficulties.HARD:
                return Speeds.HARD;
        }
    }

    self.setDirection = function (newDirection) {
        const speed = Math.sqrt( velocity.x*velocity.x + velocity.y*velocity.y );
        velocity.x = speed * newDirection.x;
        velocity.y = speed * newDirection.y;
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

    self.setDifficulty = function (newDifficulty) {
        difficulty = newDifficulty;
        updateDifficulty();
    };

    self.hasCollidedWith = function (other) {
        const selfBounds = getBoundsFrom( self.transform );
        const otherBounds = getBoundsFrom( other.transform );
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

    return self;

}

}
