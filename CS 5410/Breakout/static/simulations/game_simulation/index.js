import paddle from "./paddle.js"
import ball from "./ball.js"
import row from "./row.js"
import rowGroups from "./row_groups.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    Difficulties,
    Actions,
    Directions
) {

    const Paddle = paddle(
        Difficulties,
        Directions
    );

    const Ball = ball(
        Difficulties
    );

    const Row = row();

    const RowGroups = rowGroups(
        Row
    );

    return gameSimulation(
        Paddle,
        Ball,
        RowGroups,
        ScoreRepo,
        Difficulties,
        Actions
    );

}
