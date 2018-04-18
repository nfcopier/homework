export default function (
    ScoreRepo,
    Actions,
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
    let gameAction = Actions.NONE;
    let menu = null;
    let options = null;
    resetOptions();

    showMainMenu();

    self.update = function (actions) {
        menu.updateButtons( actions.mousePosition );
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
            case "Main Menu":
                return showMainMenu();
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
        menu.addButton( "High Scores" );
        menu.addButton( "Credits" );
        resetOptions();
    }

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
