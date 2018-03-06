import countdownRenderer from "./countdown_renderer.js"
import paddleRenderer from "./paddle_renderer.js"
import gameRenderer from "./game_renderer.js"

export default function (
    Renderer
) {

    const CountdownRenderer = countdownRenderer(
        Renderer
    );

    const PaddleRenderer = paddleRenderer(
        Renderer
    );

    return gameRenderer(
        CountdownRenderer,
        PaddleRenderer,
        Renderer
    );

}
