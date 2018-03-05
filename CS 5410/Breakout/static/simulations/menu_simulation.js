export default function (
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

    let menu = createMainMenu();

    self.update = function (actions) {
        if (actions.mouseMove !== Actions.NONE)
            menu.updateButtons( actions.mouseMove );
        if (actions.mouseUp !== Actions.NONE)
            processClick();
    };

    const processClick = function () {
        const button = menu.getSelectedButton();
        switch (button) {
            case "Difficulty": {
                menu = createDifficultyMenu();
                break;
            }
            case "Main Menu" : {
                menu = createMainMenu();
                break;
            }
            default : {
                return
            }
        }

    };

    self.getButtons = function () {
        return menu.getButtons();
    };

    function createMainMenu () {
        const menu = Menu( self.transform );
        if (gameSimulation) {
            menu.addButton( "Resume Game" );
        }
        menu.addButton( "New Game" );
        menu.addButton( "Difficulty" );
        menu.addButton( "High Scores" );
        return menu;
    }

    function createDifficultyMenu () {
        const menu = new Menu( self.transform );
        menu.addButton( "Main Menu" );
        menu.addButton( "Easy" );
        menu.addButton( "Normal" );
        menu.addButton( "Difficult" );
        return menu;
    }

    return self;

}

}
