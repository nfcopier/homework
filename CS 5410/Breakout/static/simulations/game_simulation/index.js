import paddle from "./paddle.js"
import ball from "./ball.js"
import row from "./row.js"
import rowGroups from "./row_group.js"
import collisionDetector from "./collision_detector.js"
import collisionSystem from "./collision_system.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    DifficultyRepo,
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

    const CollisionDetector = collisionDetector();

    const CollisionSystem = collisionSystem(
        CollisionDetector
    );

    return gameSimulation(
        Paddle,
        Ball,
        RowGroups,
        CollisionSystem,
        ScoreRepo,
        DifficultyRepo,
        Difficulties,
        Actions
    );

}
