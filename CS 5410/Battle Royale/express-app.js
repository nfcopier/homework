const ExpressApp = require("express");

const port = process.argv.length > 2 ? process.argv[1] : 3000;

const app = ExpressApp();

app.get("/", function (require, response) {
    response.sendFile(__dirname + "/index.html")
});

app.use("/static", ExpressApp.static("static"));

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
