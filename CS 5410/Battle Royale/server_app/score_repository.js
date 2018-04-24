module.exports = function (fs) {

const FILE_NAME = "./scores.json";

return function ScoreRepository() {

    const self = {};

    ensureScores();

    self.getAll = getAll;

    self.add = function (newScore) {
        const scores = self.getAll();
        scores.push( newScore );
        scores.sort((a, b) => b.score-a.score);
        persistScores( scores.slice(0,5) );
    };

    self.reset = function () {
        persistScores( [] );
    };

    function ensureScores() {
        if (!fs.exists( FILE_NAME ))  persistScores( [] );
    }

    function getAll() {
        const raw = fs.readFileSync( FILE_NAME );
        if (!raw.length) return null;
        return JSON.parse( raw )
    }

    function persistScores(scores) {
        const raw = JSON.stringify( scores );
        fs.writeFileSync( FILE_NAME, raw )
    }

    return self;

}

};
