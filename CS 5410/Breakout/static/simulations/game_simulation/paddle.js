export default function () {

const NORMAL_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_SUBTRACT = 15;
const PADDLE_SPEED = 0.5;

return function Paddle(gameTransform) {

    const self = {};

    let speed = 0;

    self.transform = {
        x: (gameTransform.width - NORMAL_WIDTH) * 0.5,
        y: gameTransform.height * 0.85,
        theta: 0,
        width: NORMAL_WIDTH,
        height: PADDLE_HEIGHT
    };

    self.moveLeft = function () { speed = -PADDLE_SPEED; };

    self.moveRight = function () { speed = PADDLE_SPEED; };

    self.stop = function () { speed = 0; };

    self.update = function (elapsedTime) {
        self.transform.x += speed * elapsedTime;
        if (isTooFarLeft())
            self.transform.x = gameTransform.x;
        if (isTooFarRight()) {
            const gameRight = gameTransform.x + gameTransform.width;
            self.transform.x = gameRight - self.transform.width;
        }
    };

    const isTooFarLeft = function () {
        return self.transform.x < gameTransform.x;
    };

    const isTooFarRight = function () {
        const selfRight = self.transform.x + self.transform.width;
        const gameRight = gameTransform.x + gameTransform.width;
        return selfRight > gameRight;
    };

    return self;

}

}
