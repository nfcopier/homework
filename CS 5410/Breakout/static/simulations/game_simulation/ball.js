export default function () {

const BALL_RADIUS = 7.5;
const NORMAL_SPEED = 0.5;

return function (paddleTransform) {

    const self = {};

    const velocity = {
        x: 0.1,
        y: -NORMAL_SPEED
    };

    self.transform = {
        x: getX(),
        y: getY(),
        theta: 0,
        width: BALL_RADIUS * 2,
        height: BALL_RADIUS * 2
    };

    function getX() {
        const center = paddleTransform.x + paddleTransform.width / 2;
        return center - BALL_RADIUS;
    }

    function getY() {
        return paddleTransform.y - BALL_RADIUS * 2;
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

    return self;

}

}
