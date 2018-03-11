import g from "./game_objects/index.js"
import c from "./collision_systems/index.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    DifficultyRepo,
    Difficulties,
    Actions
) {

    const collisionSystems = c();

    const gameObjects = g(
        Difficulties
    );

    return gameSimulation(
        gameObjects,
        collisionSystems,
        ScoreRepo,
        DifficultyRepo,
        Difficulties,
        Actions
    );

}
