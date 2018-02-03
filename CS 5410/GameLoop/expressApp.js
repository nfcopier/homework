const ExpressApp = require("express");

const app = ExpressApp();

app.get("/", function (require, response) {
    response.sendFile(__dirname + "/index.html")
});

app.use(ExpressApp.static("static"));

app.listen(3000, function () {
    console.log("Listening on port 3000");
});
