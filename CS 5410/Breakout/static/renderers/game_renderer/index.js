import countdownRenderer from "./countdown_renderer.js"
import paddleRenderer from "./paddle_renderer.js"
import ballRenderer from "./ball_renderer.js"
import scoreRenderer from "./score_renderer.js"
import paddlesRenderer from "./paddles_renderer.js"
import brickRenderer from "./brick_renderer.js"
import rowRenderer from "./row_renderer.js"
import rowGroupRenderer from "./row_group_renderer.js"
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

    const BrickRenderer = brickRenderer(
        Renderer
    );

    const RowRenderer = rowRenderer(
        BrickRenderer,
        Renderer
    );

    const RowGroupRenderer = rowGroupRenderer(
        RowRenderer,
        Renderer
    );

    return gameRenderer(
        CountdownRenderer,
        PaddleRenderer,
        BallRenderer,
        ScoreRenderer,
        PaddlesRenderer,
        RowGroupRenderer,
        Renderer
    );

}
