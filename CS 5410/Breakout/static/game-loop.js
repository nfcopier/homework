export default function (
    GameRenderer,
    Simulation,
    InputSystem
) {

    function GameLoop() {
        const gameStart = Date.now();
        this._simulation = new Simulation(gameStart);
        this._renderer = new GameRenderer( this._simulation );
        this._inputSystem = new InputSystem();
    }

    GameLoop.prototype.start = function () {
        this._lastTime = performance.now();
        const parent = document.getElementsByClassName("game-container")[0];
        parent.innerHTML = "";
        parent.appendChild(this._renderer._canvas);
        this._doLoop(this._lastTime);
        this._inputSystem.startListening();
    };

    GameLoop.prototype._doLoop = function (currentTime) {
        const elapsedTime = currentTime - this._lastTime;
        const actions = this._inputSystem.getActions();
        this._lastTime = currentTime;
        this._simulation.update( actions, elapsedTime );
        this._inputSystem.clear();
        this._renderer.render();
        requestAnimationFrame(this._doLoop.bind(this));
    };

    return GameLoop;

}
