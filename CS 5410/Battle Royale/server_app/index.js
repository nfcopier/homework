const gameSim = require("./game_simulation");
const scoreRepo = require("./score_repository");
const u = require("./users");
const client = require("./client");
const clients = require("./clients");
const fs = require("fs");

module.exports = function () {

    const ScoreRepo = scoreRepo( fs );

    const GameSimulation = gameSim(
        ScoreRepo
    );

    const users = u( fs );

    const Client = client(
        ScoreRepo,
        users
    );

    const Clients = clients(
        Client
    );

    return {
        GameSimulation: GameSimulation,
        Clients: Clients
    }

};