export default function (
    Difficulties
) {

const Widths = {
    EASY: 100,
    NORMAL: 75,
    HARD: 60
};
const PADDLE_HEIGHT = 15;
const PADDLE_SUBTRACT = 15;
const PADDLE_SPEED = 0.5;

return function Paddle(gameTransform, difficulty) {

    const self = {};

    let speed = 0;
    let isHalf = false;

    self.transform = {
        x: gameTransform.width * 0.5,
        y: gameTransform.height * 0.85,
        theta: 0,
        width: 0,
        height: PADDLE_HEIGHT
    };

    updateDifficulty();

    function updateDifficulty() {
        const center = self.transform.x + self.transform.width / 2;
        self.transform.width = baseWidth();
        self.transform.x = center - self.transform.width / 2;
        if (isHalf) half();
    }

    function baseWidth() {
        switch (difficulty) {
            case Difficulties.EASY:
                return Widths.EASY;
            case Difficulties.NORMAL:
                return Widths.NORMAL;
            case Difficulties.HARD:
                return Widths.HARD;
        }
    }

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

    self.setDifficulty = function (newDifficulty) {
        difficulty = newDifficulty;
        updateDifficulty();
    };

    self.half = function () {
        if (isHalf) return;
        isHalf = true;
        half();
    };

    function half() {
        self.transform.x += PADDLE_SUBTRACT;
        self.transform.width -= PADDLE_SUBTRACT * 2;
    }

    return self;

}

}
