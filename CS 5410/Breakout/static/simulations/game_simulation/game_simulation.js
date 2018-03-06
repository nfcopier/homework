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

    let otherAction = Actions.NONE;

    let gameTime = 0;

    self.update = function (actions, timeElapsed) {
        pauseAction = actions.pause;
        gameTime += timeElapsed;
        movePlayer(actions.move);
    };

    self.getAction = function () {
        return pauseAction;
    };


    self.getAction = function () { return otherAction; };

    const updatePlayerDirection = function (moveAction) {
        switch(moveAction) {
            case Actions.MOVE_LEFT:
                return paddle.moveLeft();
            case Actions.MOVE_RIGHT:
                return paddle.moveRight();
            case Actions.STOP_PADDLE:
                return paddle.stop();
        }
    };

    self.getPaddle = function () { return paddle; };

    return self;

}

}
