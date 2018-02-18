export default function (
    MazeAlgo
) {

    function Simulation() {
    }

    Simulation.prototype.startNewMaze = function (mazeSize) {
        const mazeAlgo = new MazeAlgo(mazeSize, mazeSize);
        this._maze = mazeAlgo.generateMaze();
        this._maze[0][0].hasEntrance = true;
        this._maze[0][0].hasPlayer = true;
        this._maze[mazeSize-1][mazeSize-1].hasExit = true;
    };

    Simulation.prototype.update = function (input, timeElapsed) {
    };

    Simulation.prototype.maze = function () {
        return this._maze;
    };

    return Simulation;

}