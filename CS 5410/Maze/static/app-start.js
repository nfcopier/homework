import gameRenderer from "./game-renderer.js"
import simulation from "./simulation.js"
import gameLoopModule from "./game-loop.js"
import Walls from "./walls.js"
import recursiveDivisionAlgorithm from "./recursive_division_algorithm.js"

export default function () {

    const MazeAlgo = recursiveDivisionAlgorithm(Walls);

    const GameRenderer = gameRenderer();
    const Simulation = simulation(
        MazeAlgo
    );

    const GameLoop = gameLoopModule(
        GameRenderer,
        Simulation
    );

    const gameLoop = new GameLoop();
    gameLoop.start();

}
