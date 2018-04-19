export default function (IO) {

return function IOStream() {

    const self = {};

    const io = IO();

    let input = {};

    self.startListening = function() {
        io.on( "scores:update", updateScores );
        io.on( "server:respawn", respawnPlayer );
        io.on( "server:game_state", updateGame );
        io.on( "server:player_state", updatePlayer );
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

    self.joinGame = () => io.emit( "game:join" );

    self.sendInput = (input) => {
        setTimeout( () => io.emit( "game:input", input ), 500);
    }

    return self;

}

}
