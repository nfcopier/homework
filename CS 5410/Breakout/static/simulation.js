export default function (
    Actions
) {

    function Simulation() {
    }

    Simulation.prototype.update = function (actions, timeElapsed) {
        this._movePlayer(actions.moveAction);
    };

    Simulation.prototype._movePlayer = function (moveAction) {
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

    Simulation.prototype._moveUp = function () {
    };

    Simulation.prototype._moveDown = function () {
    };

    Simulation.prototype._moveLeft = function () {
    };

    Simulation.prototype._moveRight = function () {
    };

    return Simulation;

}