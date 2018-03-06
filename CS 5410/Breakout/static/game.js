export default function (
    Canvas,
    Difficulties,
    Actions,
    renderers,
    simulations,
    InputSystem
) {

    let difficulty = Difficulties.EASY;

    function Game() {
        this._canvas = Canvas();
        this._inputSystem = InputSystem( this._canvas );
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
        this._checkGameAction();
        this._inputSystem.clear();
        this._canvas.render();
        requestAnimationFrame( this._doLoop.bind(this) );
    };

    Game.prototype._showMenu = function () {
        this._simulation =
            simulations.MenuSimulation( this._gameSimulation, difficulty );
        this._canvas.setRenderer(
            renderers.MenuRenderer( this._canvas, this._simulation )
        );
    };

    Game.prototype._checkGameAction = function () {
        const action = this._simulation.getAction();
        switch (action) {
            case Actions.NEW_GAME: {
                this._startNewGame();
                break;
            }
            case Actions.RESUME_GAME: {
                this._resumeGame();
                break;
            }
            case Actions.PAUSE_GAME: {
                this._showMenu();
                break;
            }
            case Actions.CHANGE_DIFFICULTY: {
                this._updateDifficulty();
                break;
            }
            default: {
                return;
            }
        }
    };

    Game.prototype._updateDifficulty = function () {
        difficulty = this._simulation.getDifficulty();
        if (this._gameSimulation)
            this._gameSimulation.setDifficulty( difficulty );
    };

    Game.prototype._showHighScores = function () {
        this._simulation = simulations.HighScoresSimulation();
        this._canvas.setRenderer(
            renderers.HighScoresRenderer( this._simulation )
        );
    };

    Game.prototype._startNewGame = function () {
        this._gameSimulation = simulations.GameSimulation( difficulty );
        this._resumeGame();
    };

    Game.prototype._resumeGame = function () {
        this._simulation = this._gameSimulation;
        this._canvas.setRenderer(
            renderers.GameRenderer( this._simulation )
        );
    };

    Game.prototype._clearGame = function () {
        this._gameSimulation = null;
        this._showMenu();
    };

    return Game;

}
