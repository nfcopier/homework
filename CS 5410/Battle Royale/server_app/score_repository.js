module.exports = function (fs) {

const KEY = "scores";
const FILE_NAME = "./scores.json";

return function ScoreRepository() {

    const self = {};

    ensureScores();

    self.getAll = getAll;

    self.add = function (newScore) {
        const scores = self.getAll();
        scores.push( newScore );
        scores.sort((a, b) => b-a);
        persistScores( scores.slice(0,5) );
    };

    self.reset = function () {
        persistScores( [] );
    };

    function ensureScores() {
        const scores = getAll();
        if (!scores) persistScores( [] );
    }

    function getAll() {
        const raw = fs.readFileSync( FILE_NAME, "utf-8", "w+" ) || null;
        return JSON.parse( raw );
    }

    function persistScores(scores) {
        const raw = JSON.stringify( scores );
        fs.writeFile( FILE_NAME, raw, {encoding: "utf-8"} )
    }

    return self;

}

};
