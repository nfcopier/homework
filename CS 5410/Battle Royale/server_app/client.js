module.exports = function (
    ScoreRepo,
    users
) {

return function Client(socket) {

    const self = {};

    let wantsToJoin = false;
    let input = null;

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
        socket.on( "game:join", ()  => wantsToJoin = true );
        socket.on( "game:input", (i) => input = i )
    };

    const getScores = function () {
        const scores = scoreRepo.getAll();
        scores.push({username: "Nathan", score: 720000});
        socket.emit( "scores:update", scores.slice(0, 5) );
    };

    const registerUser = function ({ username, password }) {
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

    self.wantsToJoin = function () {
        const returnVal = wantsToJoin;
        wantsToJoin = false;
        return returnVal;
    };

    self.input = function () {
        const returnVal = input;
        input = null;
        return returnVal;
    };

    self.respawn = (location) =>
        socket.emit( "server:respawn", location );

    self.sendPlayerState = (playerState) =>
        socket.emit( "server:player_state", playerState );

    self.sendGameState = (gameState) =>
        socket.emit( "server:game_state", gameState );

    return self;

}

};
