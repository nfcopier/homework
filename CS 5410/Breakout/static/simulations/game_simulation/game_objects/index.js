import gameObject from "./game_object.js"
import paddle from "./paddle.js"
import ball from "./ball.js"
import row from "./row.js"
import rowGroup from "./row_group.js"

export default function (
    Difficulties
) {

    const GameObject = gameObject();

    const Paddle = paddle(
        Difficulties,
        GameObject
    );

    const Ball = ball(
        Difficulties
    );

    const Row = row(
        GameObject
    );

    const RowGroup = rowGroup(
        Row,
        GameObject
    );

    return {
        GameObject: GameObject,
        Paddle: Paddle,
        Ball: Ball,
        RowGroup: RowGroup
    }
}
