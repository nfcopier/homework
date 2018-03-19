export default function (
    Difficulties,
    GameObject
) {

const Widths = {
    EASY: 125,
    NORMAL: 85,
    HARD: 70
};

const PADDLE_HEIGHT = 15;
const PADDLE_SUBTRACT = 15;
const PADDLE_SPEED = 0.7;

return function Paddle(parent, difficulty) {

    const transform = {
        x: parent.width * 0.5,
        y: parent.height * 0.85,
        theta: 0,
        width: 0,
        height: PADDLE_HEIGHT
    };

    const self = GameObject( transform );

    let speed = 0;
    let isHalf = false;

    const initialize = function () {
        updateDifficulty();
        self._setParent( parent );
    };

    const updateDifficulty = function () {
        const center = transform.x + transform.width / 2;
        transform.width = baseWidth();
        transform.x = center - transform.width / 2;
        if (isHalf) half();
    };

    const baseWidth = function () {
        switch (difficulty) {
            case Difficulties.EASY:
                return Widths.EASY;
            case Difficulties.NORMAL:
                return Widths.NORMAL;
            case Difficulties.HARD:
                return Widths.HARD;
        }
    };

    self.moveLeft = function () { speed = -PADDLE_SPEED; };

    self.moveRight = function () { speed = PADDLE_SPEED; };

    self.stop = function () { speed = 0; };

    self.update = function (elapsedTime) {
        transform.x += speed * elapsedTime;
        if (isTooFarLeft())
            transform.x = parent.x;
        if (isTooFarRight()) {
            const gameRight = parent.x + parent.width;
            transform.x = gameRight - transform.width;
        }
    };

    const isTooFarLeft = function () {
        return transform.x < parent.x;
    };

    const isTooFarRight = function () {
        const selfRight = transform.x + transform.width;
        const parentRight = parent.x + parent.width;
        return selfRight > parentRight;
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

    const half = function() {
        transform.x += PADDLE_SUBTRACT;
        transform.width -= PADDLE_SUBTRACT * 2;
    };

    initialize();

    return self;

}

}
