import paddle from "./paddle.js"
import ball from "./ball.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    Difficulties,
    Actions
) {

    const Paddle = paddle(
        Difficulties
    );

    const Ball = ball(
        Difficulties
    );

    return gameSimulation(
        Paddle,
        Ball,
        ScoreRepo,
        Difficulties,
        Actions
    );

}
