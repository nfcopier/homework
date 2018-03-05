export default function (
    Canvas,
    renderers,
    simulations,
    InputSystem
) {

    function Game() {
        this._canvas = Canvas();
        this._inputSystem = new InputSystem( this._canvas );
        this._clearGame();
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
        this._canvas.render();
        requestAnimationFrame( this._doLoop.bind(this) );
    };

    Game.prototype._showMenu = function () {
        this._simulation =
            new simulations.MenuSimulation( this._gameSimulation );
        this._canvas.setRenderer(
            new renderers.MenuRenderer( this._canvas, this._simulation )
        );
    };

    Game.prototype._showHighScores = function () {
        this._simulation = new simulations.HighScoresSimulation();
        this._canvas.setRenderer(
            new renderers.HighScoresRenderer( this._simulation )
        );
    };

    Game.prototype._startNewGame = function () {
        this._gameSimulation = new simulations.GameSimulation();
        this._resumeGame();
    };

    Game.prototype._resumeGame = function () {
        this._simulation = this._gameSimulation;
        this._canvas.setRenderer(
            new renderers.GameRenderer( this._simulation )
        );
    };

    Game.prototype._clearGame = function () {
        this._gameSimulation = null;
        this._showMenu();
    };

    return Game;

}
