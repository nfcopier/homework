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

    return self;

}

}
