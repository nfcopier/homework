export default function(
    Canvas,
    Actions,
    renderers,
    simulations,
    InputSystem,
    IOStream
) {

    class Game {
        constructor() {
            this._canvas = Canvas();
            this._inputSystem = InputSystem(this._canvas);
            this._ioStream = IOStream();
            this._leaveGame();
            this._showMenu();
        }

        start() {
            this._lastTime = performance.now();
            const parent = document.getElementsByClassName("main")[0];
            parent.innerHTML = "";
            parent.appendChild(this._canvas.el());
            this._doLoop(this._lastTime);
            this._inputSystem.startListening();
            this._ioStream.startListening();
        }

        _doLoop(currentTime) {
            const elapsedTime = this._getElapsedTimeFrom(currentTime);
            const input = this._ioStream.input();
            if (input.respawn) this._startNewGame();
            const camera = this._canvas.camera();
            const actions = this._inputSystem.getActions(elapsedTime, camera);
            this._ioStream.sendInput(actions);
            this._simulation.update(actions, input, elapsedTime);
            this._checkGameAction();
            this._canvas.render(elapsedTime);
            requestAnimationFrame(this._doLoop.bind(this));
        }

        _getElapsedTimeFrom(currentTime) {
            const elapsedTime = currentTime - this._lastTime;
            this._lastTime = currentTime;
            return elapsedTime;
        }

        _showMenu() {
            if (this._gameSimulation && this._gameSimulation.isGameOver())
                this._clearGame();
            this._simulation =
                simulations.MenuSimulation(this._gameSimulation);
            this._canvas.setRenderer(
                renderers.MenuRenderer(this._canvas, this._simulation)
            );
        }

        _checkGameAction() {
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
                case Actions.LEAVE_GAME: {
                    this._leaveGame();
                    break;
                }
                case Actions.REFRESH_SCORES: {
                    this._ioStream.refreshScores();
                    break;
                }
                case Actions.REGISTER_USER: {
                    this._ioStream.registerUser(this._simulation.getValues());
                    break;
                }
                case Actions.JOIN_GAME: {
                    this._ioStream.joinGame(this._simulation.getValues());
                    break;
                }
                default: {
                    return;
                }
            }
        }

        _startNewGame() {
            this._hideGameLobby();
            this._gameSimulation = simulations.GameSimulation();
            this._resumeGame();
        }

        _resumeGame() {
            if (!this._gameSimulation) return;
            this._simulation = this._gameSimulation;
            this._canvas.setRenderer(
                renderers.GameRenderer(this._simulation)
            );
        }

        _leaveGame() {
            this._resumeGame();
            this._ioStream.leaveGame();
        }

        _clearGame() {
            this._gameSimulation = null;
            this._showMenu();
        }

        _hideGameLobby() {
            const overlay = document.querySelector(".menu-overlay");
            overlay.classList.remove("enabled");
            overlay.innerHTML = "";
        }
    }

    return Game;

}
