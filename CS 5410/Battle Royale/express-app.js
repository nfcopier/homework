const ExpressApp = require("express");
const Http = require("http").Server;
const IO = require("socket.io");

const port = process.argv.length > 2 ? process.argv[1] : 3000;

const initialize = function() {

    const app = ExpressApp();
    const http = Http( app );
    const io = IO(http);

    app.get("/", function (require, response) {
        response.sendFile(__dirname + "/index.html")
    });

    io.on( "connection", handleClientConnect );

    app.use("/static", ExpressApp.static("static"));

    http.listen(port, function () {
        console.log(`Listening on port ${port}`);
    });

};

const handleClientConnect = function(socket) {};


initialize();
