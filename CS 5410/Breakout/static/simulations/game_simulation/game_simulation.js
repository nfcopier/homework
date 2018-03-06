export default function (
    Paddle,
    Actions
) {

return function GameSimulation() {

    const self = {};

    self.transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    const paddle = Paddle( self.transform );

    let pauseAction = Actions.NONE;

    let gameTime = 0;

    self.update = function (actions, timeElapsed) {
        pauseAction = actions.pause;
        gameTime += timeElapsed;
        movePlayer(actions.move);
    };

    self.getAction = function () {
        return pauseAction;
    };

    const movePlayer = function (moveAction) {
        switch(moveAction) {
            case Actions.MOVE_LEFT : {
                moveLeft();
                return;
            }
            case Actions.MOVE_RIGHT : {
                moveRight();
                return;
            }
            case Actions.STOP_PADDLE : {
                stopPaddle();
                return;
            }
            case Actions.NONE : {
                return;
            }
        }
    };

    const moveLeft = function () {
    };

    const moveRight = function () {
    };

    const stopPaddle = function () {
    };

    self.getPaddle = function () {
        return paddle;
    };

    return self;

}

}
