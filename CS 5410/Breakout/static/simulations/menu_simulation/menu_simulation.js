export default function (
    ScoreRepo,
    DifficultyRepo,
    Actions,
    Difficulties,
    Menu
) {

return function MenuSimulation(gameSimulation) {

    const self = {};

    self.transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    const scoreRepo = ScoreRepo();
    const difficultyRepo = DifficultyRepo();
    let gameAction = Actions.NONE;
    let menu = null;
    let options = null;
    resetOptions();

    showMainMenu();

    self.update = function (actions) {
        if (actions.mouseMove !== Actions.NONE)
            menu.updateButtons( actions.mouseMove );
        if (actions.mouseUp !== Actions.NONE)
            processClick();
    };

    const processClick = function () {
        const button = menu.getSelectedButton();
        switch (button) {
            case "Resume":
                return gameAction = Actions.RESUME_GAME;
            case "New Game":
                return gameAction = Actions.NEW_GAME;
            case "Difficulty":
                return showDifficultyMenu();
            case "Main Menu":
                return showMainMenu();
            case "Easy":
                return changeDifficulty( Difficulties.EASY );
            case "Normal":
                return changeDifficulty( Difficulties.NORMAL );
            case "Hard":
                return changeDifficulty( Difficulties.HARD );
            case "High Scores":
                return showHighScores();
            case "Reset":
                return resetHighScores();
            case "Credits":
                return showCredits();
            default:
                return gameAction = Actions.NONE;
        }

    };

    const changeDifficulty = function (newDifficulty) {
        difficultyRepo.update( newDifficulty );
        gameAction = Actions.CHANGE_DIFFICULTY;
        disableDifficultyButton();
    };

    self.getMenuName = function () { return menu.getName(); };

    self.getButtons = function () {
        return menu.getButtons();
    };

    self.getAction = function () {
        return gameAction;
    };

    function showMainMenu () {
        menu = Menu( "Main Menu", self.transform );
        if (gameSimulation) {
            menu.addButton( "Resume" );
        }
        menu.addButton( "New Game" );
        menu.addButton( "Difficulty" );
        menu.addButton( "High Scores" );
        menu.addButton( "Credits" );
        resetOptions();
    }

    function showDifficultyMenu () {
        showSubMenu( "Difficulty" );
        menu.addButton( "Easy" );
        menu.addButton( "Normal" );
        menu.addButton( "Hard" );
        disableDifficultyButton();
        resetOptions();
    }

    const disableDifficultyButton = function () {
        const difficulty = difficultyRepo.getDifficulty();
        switch (difficulty) {
            case Difficulties.EASY:
                return menu.disable( "Easy" );
            case Difficulties.NORMAL:
                return menu.disable( "Normal" );
            case Difficulties.HARD:
                return menu.disable( "Hard" );
        }
    };

    const showHighScores = function () {
        showSubMenu( "High Scores" );
        menu.addButton( "Reset" );
        resetOptions();
        options.highScores = true;
    };

    const resetHighScores = function () {
        scoreRepo.reset();
    };

    const showCredits = function () {
        showSubMenu( "Credits" );
        resetOptions();
        options.credits = true;
    };

    const showSubMenu = function (name) {
        menu = new Menu( name, self.transform );
        menu.addButton( "Main Menu" );
    };

    self.getOptions = function () { return options; };

    function resetOptions() {
        options = { highScores: false, credits: false };
    }

    self.getHighScores = function () {
        return scoreRepo.getAll();
    };

    self.getCredits = function () {
        return [
            ["Developed, with love, for CS 5410."],
            [],
            ["School", "Utah State University"],
            ["Professor", "Dr. Dean Mathias"],
            ["Developer", "Nathan Copier"],
            [],
            ["Gaussian function taken from sample code."],
            ["Background: http://www.spyderonlines.com/picture/free-space-backgrounds.html"],
            ["Brick overlay: https://pngtree.com/element/down?id=Mjg1MTQxOA==&type=1"],
            ["Steel ball: https://pixabay.com/en/balls-many-small-steel-ball-steel-1378300/"],
            ["To see more of my homework projects go to: "],
            ["https://github.com/nfcopier/homework"]
        ];
    };

    return self;

}

}
