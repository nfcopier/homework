export default function (
    GameRenderer,
    Simulation
) {

    function GameLoop() {
        this._gameStart = Date.now();
        this._renderer = new GameRenderer();
        this._simulation = new Simulation();
    }

    GameLoop.prototype.start = function () {
        this._lastTime = performance.now();
        this._doLoop(this._lastTime);
    };

    GameLoop.prototype._doLoop = function (currentTime) {
        this._simulation.update();
        this._renderer.render();
        requestAnimationFrame(this._doLoop.bind(this));
    };

    return GameLoop;

}
