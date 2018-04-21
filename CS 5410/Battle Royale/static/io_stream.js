export default function (IO) {

return function IOStream() {

    const self = {};

    const io = IO();

    let input = {};

    self.startListening = function() {
        io.on( "scores:update", updateScores );
        io.on( "user:registration_success", () => input.registerSuccess = true );
        io.on( "server:respawn", respawnPlayer );
        io.on( "server:game_state", updateGame );
        io.on( "server:player_state", updatePlayer );
        io.on( "user:logged_out", logoutUser )
    };

    const updateScores = (scores) => input.highScores = scores;

    self.input = function() {
        const currentInput = input;
        input = {};
        return currentInput;
    };

    self.refreshScores = () => io.emit( "scores:refresh" );

    self.registerUser = (credentials) => io.emit( "user:register", credentials );

    const respawnPlayer = (location) => input.respawn = location;

    const updateGame = (gameState) => input.gameState = gameState;

    const updatePlayer = (playerState) => {
        setTimeout( () => input.playerState = playerState, 500);
    }

    const logoutUser = () => input.loggedout = true;

    self.joinGame = (credentials) => io.emit( "game:join", credentials );

    self.sendInput = (actions) => {
        setTimeout( () => io.emit( "game:input", actions ), 500);
    }

    self.leaveGame = () => io.emit( "game:left" );

    return self;

}

}
