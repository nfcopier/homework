const g              = require("./game_objects/index.js");
const c              = require("./collision_systems/index.js");
const actions        = require("./actions");
const gameSimulation = require("./game_simulation.js");

module.exports = function () {

    const collisionSystems = c();

    const gameObjects = g();

    return gameSimulation(
        gameObjects,
        collisionSystems,
        actions
    );

};
