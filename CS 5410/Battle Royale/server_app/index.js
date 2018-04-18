const scoreRepo = require("./score_repository");
const client = require("./client");
const clients = require("./clients");
const fs = require("fs");

module.exports = function () {

    const ScoreRepo = scoreRepo(fs);

    const Client = client(
        ScoreRepo
    );

    const Clients = clients(
        Client
    );

    return {
        Clients: Clients
    }

};