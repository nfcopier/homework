import Actions from "./actions.js"
import KeyCodes from "./key_codes.js"
import canvas from "./canvas.js"
import r from "./renderers/index.js"
import s from "./simulations/index.js"
import inputSystem from "./input_system.js"
import game from "./game.js"
import Directions from "./directions.js"
import Difficulties from "./difficulties.js"

export default function () {

    const Canvas = canvas();

    const renderers = r(
        Directions
    );

    const simulations = s(
        Difficulties,
        Actions,
        Directions
    );

    const InputSystem = inputSystem(
        KeyCodes,
        Actions,
        Directions
    );

    const Game = game(
        Canvas,
        Difficulties,
        Actions,
        renderers,
        simulations,
        InputSystem
    );

    const gameInstance = new Game();
    gameInstance.start();

}
