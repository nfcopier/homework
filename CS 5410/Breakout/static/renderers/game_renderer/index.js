import countdownRenderer from "./countdown_renderer.js"
import paddleRenderer from "./paddle_renderer.js"
import ballRenderer from "./ball_renderer.js"
import scoreRenderer from "./score_renderer.js"
import paddlesRenderer from "./paddles_renderer.js"
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

    const BallRenderer = ballRenderer(
        Renderer
    );

    const ScoreRenderer = scoreRenderer(
        Renderer
    );

    const PaddlesRenderer = paddlesRenderer(
        Renderer,
        PaddleRenderer
    );

    return gameRenderer(
        CountdownRenderer,
        PaddleRenderer,
        BallRenderer,
        ScoreRenderer,
        PaddlesRenderer,
        Renderer
    );

}
