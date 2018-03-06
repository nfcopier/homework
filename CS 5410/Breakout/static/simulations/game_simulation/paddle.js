export default function () {

const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;
const PADDLE_SUBTRACT = 15;

return function Paddle(gameTransform) {

    self = {};

    self.transform = {
        x: (gameTransform.width - PADDLE_WIDTH) * 0.5,
        y: gameTransform.height * 0.85,
        theta: 0,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT
    };

    return self;

}

}