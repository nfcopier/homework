import countdownRenderer from "./countdown_renderer.js"
import scoreRenderer     from "./score_renderer.js"
import analyticsRenderer from "./analytics_renderer.js"
import gameAreaRenderer  from "./game_area_renderer.js"
import blockRenderer     from "./block_renderer.js"
import gameRenderer      from "./game_renderer.js"

export default function (
    Renderer
) {

    const CountdownRenderer = countdownRenderer(
        Renderer
    );

    const ScoreRenderer = scoreRenderer(
        Renderer
    );

    const AnalyticsRenderer = analyticsRenderer(
        Renderer
    );

    const GameAreaRenderer = gameAreaRenderer(
        Renderer
    );

    const FoodRenderer = blockRenderer(
        "red",
        Renderer
    );

    const ObstacleRenderer = blockRenderer(
        "grey",
        Renderer
    );

    const SnakeSegmentRenderer = blockRenderer(
        "yellow",
        Renderer
    );

    return gameRenderer(
        CountdownRenderer,
        ScoreRenderer,
        AnalyticsRenderer,
        GameAreaRenderer,
        FoodRenderer,
        ObstacleRenderer,
        SnakeSegmentRenderer,
        Renderer
    );

}
