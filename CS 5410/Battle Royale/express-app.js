const ExpressApp = require("express");
const Http = require("http").Server;
const IO = require("socket.io");
const Clients = require("./server_app/clients.js");
const GameSimulation = require("./server_app/game_simulation/game_simulation.js")

const port = process.argv.length > 2 ? process.argv[1] : 3000;
const TICK_LENGTH = 1000 / 60;

const self = {};

const initialize = function() {

    const app = ExpressApp();
    const http = Http(app);
    const io = IO(http);
    self.clients = Clients();

    app.get("/", function(require, response) {
        response.sendFile(__dirname + "/index.html");
    });

    io.on("connection", handleClientConnect);

    app.use("/static", ExpressApp.static("static"));

    startGame();

    http.listen(port, function() {
        console.log(`Listening on port ${port}`);
    });

};

const handleClientConnect = function(socket) {
    self.clients.add(socket);
};

const startGame = function() {
    self.game = GameSimulation(self.clients);
    doGameLoop(Date.now(), 0);
};

const doGameLoop = function(currentTime, elapsedTime) {
    setTimeout(() => {
        const now = Date.now();
        doGameLoop(now, now - currentTime);
    }, TICK_LENGTH);
    self.game.update(elapsedTime);
};

initialize();
