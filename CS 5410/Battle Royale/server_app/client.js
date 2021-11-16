const ScoreRepo = require("./score_repository.js");
const users = require("./users");

module.exports = function Client(socket) {

    const self = {};

    let justLoggedIn = false;
    let isLoggedIn = false;
    let input = null;
    let username;

    const scoreRepo = ScoreRepo();

    const UserErrors = [
        "userExists",
        "password_empty",
        "username_empty",
        "invalid_credentials"
    ];

    self.startListening = () => {
        socket.on("scores:refresh", getScores);
        socket.on("user:register", registerUser);
        socket.on("game:join", joinGame);
        socket.on("game:input", (i) => input = i);
        socket.on("game:left", self.endGame);
        socket.on("disconnect", self.endGame);
    };

    const joinGame = (credentials = {}) => {
        try {
            username = credentials.username;
            const isAuthorized = users.check(username, credentials.password);
            if (!isAuthorized) return;
            justLoggedIn = true;
            isLoggedIn = true;
            console.log("Player joined the game!");
        } catch (e) {
            if (UserErrors.includes(e))
                socket.emit(`error:user:${e}`);
            else
                socket.emit(`error:unknown:${e}`);
        }
    };

    const getScores = () => {
        const scores = scoreRepo.getAll();
        socket.emit("scores:update", scores.slice(0, 5));
    };

    const registerUser = ({username, password} = {}) => {
        try {
            users.registerUser(username, password);
            console.log("user registered!");
            socket.emit("user:registration_success");
        } catch (e) {
            if (UserErrors.includes(e))
                socket.emit(`error:user:${e}`);
            else
                socket.emit(`error:unknown:${e}`);
        }
    };

    self.justLoggedIn = () => {
        const returnVal = justLoggedIn;
        justLoggedIn = false;
        return returnVal;
    };

    self.isLoggedIn = () => isLoggedIn;

    self.input = () => {
        const returnVal = input;
        input = null;
        return returnVal;
    };

    self.respawn = (spawnPoint, buildingData) =>
        socket.emit("server:respawn", spawnPoint, buildingData);

    self.username = () => username;

    self.endGame = () => {
        if (!isLoggedIn)
            username = null;
        isLoggedIn = false;
        socket.emit("user:logged_out");
        console.log("Player left the game!");
    };

    self.sendPlayerState = (playerState) =>
        socket.emit("server:player_state", playerState);

    self.sendGameState = (gameState) =>
        socket.emit("server:game_state", gameState);

    return self;

};
