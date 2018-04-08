import g              from "./game_objects/index.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    DifficultyRepo,
    Difficulties,
    Actions
) {

    const gameObjects = g(
        Difficulties
    );

    return gameSimulation(
        gameObjects,
        ScoreRepo,
        DifficultyRepo,
        Difficulties,
        Actions
    );

}
