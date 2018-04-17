import g              from "./game_objects/index.js"
import c              from "./collision_systems/index.js"
import p              from "./particle_system/index.js"
import gameSimulation from "./game_simulation.js"

export default function (
    ScoreRepo,
    Actions
) {

    const collisionSystems = c();

    const gameObjects = g(
    );

    const ParticleSystem = p();

    return gameSimulation(
        gameObjects,
        collisionSystems,
        ParticleSystem,
        ScoreRepo,
        Actions
    );

}
