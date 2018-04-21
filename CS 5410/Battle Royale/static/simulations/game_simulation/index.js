import g              from "./game_objects/index.js"
import statePredictor from "./state_predictor.js"
import c              from "./collision_systems/index.js"
import p              from "./particle_system/index.js"
import gameSimulation from "./game_simulation.js"

export default function (
    Actions
) {

    const collisionSystems = c();

    const gameObjects = g(
    );

    const StatePredictor = statePredictor(
        Actions,
        gameObjects.Avatar
    );

    const ParticleSystem = p();

    return gameSimulation(
        gameObjects,
        StatePredictor,
        collisionSystems,
        ParticleSystem,
        Actions
    );

}
