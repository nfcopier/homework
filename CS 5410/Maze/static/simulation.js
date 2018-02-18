export default function (
    MazeAlgo
) {

    function Simulation() {
        const mazeAlgo = new MazeAlgo(64, 64);
        this._maze = mazeAlgo.generateMaze();
    }

    Simulation.prototype.update = function (timeElapsed) {
    };

    Simulation.prototype.maze = function () {
        return this._maze;
    };

    return Simulation;

}