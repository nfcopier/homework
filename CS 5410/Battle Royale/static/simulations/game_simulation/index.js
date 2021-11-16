import statePredictor from "./avatar_state_predictor.js";
import c              from "./collision_systems/index.js";
import g              from "./game_objects/index.js";
import gameSimulation from "./game_simulation.js";
import p              from "./particle_system/index.js";

export default function(
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
