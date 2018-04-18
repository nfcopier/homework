export default function (IO) {

return function IOStream() {

    const self = {};

    const io = IO();

    let input = {};

    self.startListening = function() {
        io.on( "scores:update", updateScores )
    };

    const updateScores = function(scores) {
        input.highScores = scores;
    };

    self.input = function() {
        const currentInput = input;
        input = {};
        return currentInput;
    };

    self.refreshScores = function() {
        io.emit( "scores:refresh" );
    };

    return self;

}

}
