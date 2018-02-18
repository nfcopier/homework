export default function (
    MazeAlgo,
    Actions,
    Walls
) {

    function Simulation() {
    }

    Simulation.prototype.startNewMaze = function (mazeSize) {
        const mazeAlgo = new MazeAlgo(mazeSize, mazeSize);
        this._maze = mazeAlgo.generateMaze();
        this._maze[0][0].hasEntrance = true;
        this._maze[0][0].hasPlayer = true;
        this._currentPlayerLocation = { row: 0, column: 0 };
        this._maze[mazeSize-1][mazeSize-1].hasExit = true;
    };

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
        const loc = this._currentPlayerLocation;
        const playerCell = this._maze[loc.row][loc.column];
        if (playerCell.walls & Walls.TOP) return;
        playerCell.hasPlayer = false;
        this._currentPlayerLocation.row -= 1;
        this._maze[loc.row][loc.column].hasPlayer = true;
    };

    Simulation.prototype._moveDown = function () {
        const loc = this._currentPlayerLocation;
        const playerCell = this._maze[loc.row][loc.column];
        if (playerCell.walls & Walls.BOTTOM) return;
        playerCell.hasPlayer = false;
        this._currentPlayerLocation.row += 1;
        this._maze[loc.row][loc.column].hasPlayer = true;
    };

    Simulation.prototype._moveLeft = function () {
        const loc = this._currentPlayerLocation;
        const playerCell = this._maze[loc.row][loc.column];
        if (playerCell.walls & Walls.LEFT) return;
        playerCell.hasPlayer = false;
        this._currentPlayerLocation.column -= 1;
        this._maze[loc.row][loc.column].hasPlayer = true;
    };

    Simulation.prototype._moveRight = function () {
        const loc = this._currentPlayerLocation;
        const playerCell = this._maze[loc.row][loc.column];
        if (playerCell.walls & Walls.RIGHT) return;
        playerCell.hasPlayer = false;
        this._currentPlayerLocation.column += 1;
        this._maze[loc.row][loc.column].hasPlayer = true;
    };

    Simulation.prototype.maze = function () {
        return this._maze;
    };

    return Simulation;

}