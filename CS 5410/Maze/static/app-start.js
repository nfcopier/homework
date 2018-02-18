import Actions from "./actions.js"
import KeyCodes from "./key_codes.js"
import inputSystem from "./input_system.js"
import simulation from "./simulation.js"
import gameRenderer from "./game_renderer/index.js"
import gameLoopModule from "./game-loop.js"
import Walls from "./walls.js"
import recursiveDivisionAlgorithm from "./recursive_division_algorithm.js"

export default function () {

    const InputSystem = inputSystem(
        KeyCodes,
        Actions
    );

    const MazeAlgo = recursiveDivisionAlgorithm(
        Walls
    );

    const Simulation = simulation(
        MazeAlgo,
        Actions,
        Walls
    );

    const GameRenderer = gameRenderer(
        Walls
    );

    const GameLoop = gameLoopModule(
        GameRenderer,
        Simulation,
        InputSystem
    );

    const gameLoop = new GameLoop();
    gameLoop.start();

}
