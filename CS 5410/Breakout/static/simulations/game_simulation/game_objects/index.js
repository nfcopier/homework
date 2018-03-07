import paddle from "./paddle.js"
import ball from "./ball.js"
import row from "./row.js"
import rowGroup from "./row_group.js"

export default function (
    Difficulties,
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

    const RowGroup = rowGroup(
        Row
    );

    return {
        Paddle: Paddle,
        Ball: Ball,
        RowGroup: RowGroup
    }
}
