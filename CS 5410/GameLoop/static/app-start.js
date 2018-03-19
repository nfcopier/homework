import gameRenderer from "./game-renderer/index.js"
import simulation from "./simulation.js"
import gameLoopModule from "./game-loop.js"

export default function ($) {

    const GameRenderer = gameRenderer($);
    const Simulation = simulation();

    const GameLoop = gameLoopModule(
        GameRenderer,
        Simulation,
        $
        );

    const gameLoop = new GameLoop();
    gameLoop.start();

    delete window.$;

}
