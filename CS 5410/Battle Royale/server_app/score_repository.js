export default function () {

const KEY = "scores";

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
        const raw = localStorage.getItem( KEY ) || null;
        return JSON.parse( raw );
    }

    function persistScores(scores) {
        const raw = JSON.stringify( scores );
        localStorage.setItem( KEY, raw )
    }

    return self;

}

}
