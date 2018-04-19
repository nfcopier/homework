const ExpressApp = require("express");
const Http = require("http").Server;
const IO = require("socket.io");
const serverApp = require("./server_app")();

const port = process.argv.length > 2 ? process.argv[1] : 3000;

const self = {};

const initialize = function() {

    const app = ExpressApp();
    const http = Http( app );
    const io = IO(http);
    self.clients = serverApp.Clients();

    app.get("/", function (require, response) {
        response.sendFile(__dirname + "/index.html")
    });

    io.on( "connection", handleClientConnect );

    app.use("/static", ExpressApp.static("static"));

    startGame();

    http.listen(port, function () {
        console.log(`Listening on port ${port}`);
    });

};

const handleClientConnect = function(socket) {
    self.clients.add( socket );
};

const startGame = function() {
    self.game = serverApp.GameSimulation( self.clients );
    doGameLoop( Date.now(), 0 );
};

const doGameLoop = function(currentTime, elapsedTime) {
    self.game.update( elapsedTime );
    setTimeout(() => {
        const now = Date.now();
        doGameLoop(now, now - currentTime)
    }, 16)
};


initialize();
