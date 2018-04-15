const Express = require("express");

const PORT = 3000;

const daApp = Express();

daApp.get("/", function (require, response) {
    response.sendFile(__dirname + "/index.html")
});

daApp.use("/static", Express.static("static"));

daApp.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
