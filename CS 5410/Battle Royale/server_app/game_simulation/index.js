const g              = require("./game_objects/index");
const c              = require("./collision_systems/index");
const actions        = require("./actions");
const player         = require("./player");
const m              = require("./maps");
const gameSimulation = require("./game_simulation");

module.exports = function () {

    const collisionSystems = c();

    const gameObjects = g(
        collisionSystems
    );

    const Player = player(
        actions,
        gameObjects.Avatar
    );

    const maps = m(
        gameObjects.Building,
        () => {}
    );

    return gameSimulation(
        Player,
        gameObjects,
        maps
    );

};
