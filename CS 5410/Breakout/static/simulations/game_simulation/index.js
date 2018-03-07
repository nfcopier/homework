import g from "./game_objects/index.js"
import c from "./collision_systems/index.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    DifficultyRepo,
    Difficulties,
    Actions,
    Directions
) {

    const collisionSystems = c();

    const gameObjects = g(
        Difficulties,
        Directions
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
