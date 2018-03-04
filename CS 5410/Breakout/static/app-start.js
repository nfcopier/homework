import Actions from "./actions.js"
import KeyCodes from "./key_codes.js"
import inputSystem from "./input_system.js"
import simulation from "./simulation.js"
import gameRenderer from "./game_renderer/index.js"
import gameLoopModule from "./game-loop.js"
import Directions from "./directions.js"

export default function () {

    const InputSystem = inputSystem(
        KeyCodes,
        Actions
    );

    const Simulation = simulation(
        Actions
    );

    const GameRenderer = gameRenderer(
        Directions
    );

    const GameLoop = gameLoopModule(
        GameRenderer,
        Simulation,
        InputSystem
    );

    const gameLoop = new GameLoop();
    gameLoop.start();

}
