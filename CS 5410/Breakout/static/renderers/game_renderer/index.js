import paddleRenderer from "./paddle_renderer.js"
import gameRenderer from "./game_renderer.js"

export default function (
    Renderer
) {

    const PaddleRenderer = paddleRenderer(
        Renderer
    );

    return gameRenderer(
        PaddleRenderer,
        Renderer
    );

}
