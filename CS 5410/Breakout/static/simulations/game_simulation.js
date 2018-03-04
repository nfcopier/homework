export default function (
    Actions
) {

    function GameSimulation() {
        this._gameTime = 0;
    }

    GameSimulation.prototype.update = function (actions, timeElapsed) {
        this._movePlayer(actions.moveAction);
    };

    GameSimulation.prototype._movePlayer = function (moveAction) {
        switch(moveAction) {
            case Actions.MOVE_UP: {
                this._moveUp();
                return
            }
            case Actions.MOVE_DOWN: {
                this._moveDown();
                return
            }
            case Actions.MOVE_LEFT: {
                this._moveLeft();
                return
            }
            case Actions.MOVE_RIGHT: {
                this._moveRight();
                return
            }
            case Actions.NONE: {
                return
            }
        }
    };

    GameSimulation.prototype._moveUp = function () {
    };

    GameSimulation.prototype._moveDown = function () {
    };

    GameSimulation.prototype._moveLeft = function () {
    };

    GameSimulation.prototype._moveRight = function () {
    };

    return GameSimulation;

}
