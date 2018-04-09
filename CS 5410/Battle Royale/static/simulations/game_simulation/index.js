import g              from "./game_objects/index.js"
import c              from "./collision_systems/index.js"
import p              from "./particle_system/index.js"
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

    const ParticleSystem = p();

    return gameSimulation(
        gameObjects,
        collisionSystems,
        ParticleSystem,
        ScoreRepo,
        DifficultyRepo,
        Difficulties,
        Actions
    );

}
