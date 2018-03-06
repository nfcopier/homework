import paddle from "./paddle.js"
import gameSimulation from "./game_simulation.js"

export default function (
    Actions
) {

    const Paddle = paddle();

    return gameSimulation(
        Paddle,
        Actions
    );

}
