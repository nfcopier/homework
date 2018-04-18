module.exports = function (
    ScoreRepo,
    users
) {

return function Client(socket) {

    const self = {};

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

    return self;

}

};
