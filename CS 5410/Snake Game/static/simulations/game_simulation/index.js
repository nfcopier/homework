import g              from "./game_objects/index.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    DifficultyRepo,
    Difficulties,
    Directions,
    Actions
) {

    const gameObjects = g(
        Difficulties,
        Directions
    );

    return gameSimulation(
        gameObjects,
        ScoreRepo,
        DifficultyRepo,
        Difficulties,
        Directions,
        Actions
    );

}
