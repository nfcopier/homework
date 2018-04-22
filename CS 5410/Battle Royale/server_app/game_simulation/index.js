const g              = require("./game_objects/index");
const c              = require("./collision_systems/index");
const actions        = require("./actions");
const player         = require("./player");
const gameSimulation = require("./game_simulation");

module.exports = function () {

    const collisionSystems = c();

    const gameObjects = g(
        collisionSystems.BoundingBoxDetector
    );

    const Player = player(
        actions,
        gameObjects.Avatar
    );

    return gameSimulation(
        Player,
        gameObjects
    );

};
