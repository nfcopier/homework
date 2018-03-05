export default function (
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
            case Actions.MOVE_UP: {
                moveUp();
                return
            }
            case Actions.MOVE_DOWN: {
                moveDown();
                return
            }
            case Actions.MOVE_LEFT: {
                moveLeft();
                return
            }
            case Actions.MOVE_RIGHT: {
                moveRight();
                return
            }
            case Actions.NONE: {
                return
            }
        }
    };

    const moveUp = function () {
    };

    const moveDown = function () {
    };

    const moveLeft = function () {
    };

    const moveRight = function () {
    };

    return self;

}

}
