module.exports = function (
    ScoreRepo
) {

return function Client(socket) {

    const self = {};

    const scoreRepo = ScoreRepo();

    self.startListening = function () {
        socket.on( "scores:refresh", getScores )
    };

    const getScores = function () {
        const scores = scoreRepo.getAll();
        scores.push({username: "Nathan", score: 720000});
        socket.emit( "scores:update", scores );
    };

    return self;

}

};
