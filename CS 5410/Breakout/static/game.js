export default function (
    Canvas,
    renderers,
    simulations,
    InputSystem
) {

    function Game() {
        this._clearGame();
        this._inputSystem = new InputSystem();
        this._canvas = Canvas();
    }

    Game.prototype.start = function () {
        this._lastTime = performance.now();
        const parent = document.getElementsByClassName("main")[0];
        parent.innerHTML = "";
        parent.appendChild(this._canvas.el());
        this._doLoop(this._lastTime);
        this._inputSystem.startListening();
    };

    Game.prototype._doLoop = function (currentTime) {
        const elapsedTime = currentTime - this._lastTime;
        const actions = this._inputSystem.getActions();
        this._lastTime = currentTime;
        this._simulation.update( actions, elapsedTime );
        this._inputSystem.clear();
        this._renderer.render();
        requestAnimationFrame( this._doLoop.bind(this) );
    };

    Game.prototype._showMenu = function () {
        this._simulation = new simulations.MenuSimulation( this._gameSimulation );
        this._renderer = new renderers.MenuRenderer( this._simulation );
    };

    Game.prototype._clearGame = function () {
        this._gameSimulation = null;
        this._showMenu();
    };

    return Game;

}
