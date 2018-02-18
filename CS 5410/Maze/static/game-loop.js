export default function (
    GameRenderer,
    Simulation
) {

    function GameLoop() {
        this._gameStart = Date.now();
        this._simulation = new Simulation();
        this._renderer = new GameRenderer( this._simulation );
    }

    GameLoop.prototype.start = function () {
        this._lastTime = performance.now();
        const parent = document.getElementsByClassName("game-container")[0];
        parent.innerHTML = "";
        parent.appendChild(this._renderer._canvas);
        this._doLoop(this._lastTime);
    };

    GameLoop.prototype._doLoop = function (currentTime) {
        const elapsedTime = currentTime - this._lastTime;
        this._lastTime = currentTime;
        this._simulation.update( elapsedTime );
        this._renderer.render();
        requestAnimationFrame(this._doLoop.bind(this));
    };

    return GameLoop;

}
