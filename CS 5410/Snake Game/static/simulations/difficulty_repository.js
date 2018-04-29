export default function (Difficulties) {

const KEY = "difficulty";

return function DifficultyRepository() {

    const self = {};

    const ensureDifficulty = function () {
        const difficulty = self.getDifficulty();
        if (difficulty === null)
            self.update( Difficulties.NORMAL );
    };

    self.getDifficulty = function () {
        return +localStorage.getItem( KEY )
    };

    self.update = function (newDifficulty) {
        localStorage.setItem( KEY, newDifficulty );
    };
    return self;

}

}
