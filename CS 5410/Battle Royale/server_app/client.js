module.exports = function (
    ScoreRepo,
    users
) {

return function Client(socket) {

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

    self.startListening = function () {
        socket.on( "scores:refresh", getScores );
        socket.on( "user:register", registerUser );
        socket.on( "game:join", joinGame );
        socket.on( "game:input", (i) => input = i );
        socket.on( "game:left", leaveGame );
        socket.on( "disconnect", leaveGame );
    };

    const joinGame = function (credentials = {}) {
        try {
            username = credentials.username;
            const isAuthorized = users.check(username, credentials.password);
            if (!isAuthorized) return;
            justLoggedIn = true;
            isLoggedIn = true;
            console.log( "Player joined the game!" );
        } catch (e) {
            if (UserErrors.includes(e))
                socket.emit( `error:user:${e}` );
            else
                socket.emit( `error:unknown:${e}` );
        }
    };

    const getScores = function () {
        const scores = scoreRepo.getAll();
        socket.emit( "scores:update", scores.slice(0, 5) );
    };

    const registerUser = function ({ username, password } = {}) {
        try {
            users.registerUser( username, password );
            console.log( "user registered!" );
            socket.emit( "user:registration_success" );
        } catch (e) {
            if (UserErrors.includes(e))
                socket.emit( `error:user:${e}` );
            else
                socket.emit( `error:unknown:${e}` );
        }
    };

    const leaveGame = function() {
        if (!isLoggedIn) return;
        username = null;
        isLoggedIn = false;
        socket.emit( "user:logged_out" );
        console.log( "Player left the game!" );
    };

    self.justLoggedIn = function () {
        const returnVal = justLoggedIn;
        justLoggedIn = false;
        return returnVal;
    };

    self.isLoggedIn = () => isLoggedIn;

    self.input = function () {
        const returnVal = input;
        input = null;
        return returnVal;
    };

    self.respawn = (spawnPoint, buildingData) =>
        socket.emit( "server:respawn", spawnPoint, buildingData );

    self.username = () => username;

    self.endGame = function() {
        leaveGame();
    };

    self.sendPlayerState = (playerState) =>
        socket.emit( "server:player_state", playerState );

    self.sendGameState = (gameState) =>
        socket.emit( "server:game_state", gameState );

    return self;

}

};
