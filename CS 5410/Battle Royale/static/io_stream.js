export default function (IO) {

return function IOStream() {

    const self = {};

    const io = IO();

    let input = {};

    self.startListening = function() {
        io.on( "scores:update", updateScores );
        io.on( "server:update", updateFromServer );
    };

    const updateScores = (scores) => input.highScores = scores;

    self.input = function() {
        const currentInput = input;
        input = {};
        return currentInput;
    };

    self.refreshScores = () => io.emit( "scores:refresh" );

    self.registerUser = (credentials) =>io.emit( "user:register", credentials );

    const updateFromServer = (serverState) => input.serverState = serverState;

    self.joinGame = () => io.emit( "game:join" );

    self.sendInput = (input) => io.emit( "game:input", input );

    return self;

}

}
