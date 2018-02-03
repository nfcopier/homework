import rendererModule from "./renderer.js"
import gameLoopModule from "./game-loop.js"

export default function ($) {

    const Renderer = rendererModule($);
    const GameLoop = gameLoopModule(Renderer);
    const gameLoop = new GameLoop();
    gameLoop.start();

}
