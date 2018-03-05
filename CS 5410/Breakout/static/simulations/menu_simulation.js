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

    const buttons = createMainMenu();

    self.update = function (actions) {
        if (actions.mouseMove === Actions.NONE) return;
        for (let button of buttons) {
            button.hasMouse = checkCollision( button, actions.mouseMove );
        }
    };

    const checkCollision = function (button, mouseLocation) {
        return (
            (mouseLocation.x > button.transform.x &&
            mouseLocation.x < button.transform.x + button.transform.width &&
            mouseLocation.y > button.transform.y &&
            mouseLocation.y < button.transform.y + button.transform.height)
        )
    };

    self.getButtons = function () {
        return buttons;
    };

    function createMainMenu () {
        const menu = Menu( self.transform );
        if (gameSimulation) {
            menu.addButton( "Resume Game" );
        }
        menu.addButton( "New Game" );
        menu.addButton( "Difficulty" );
        menu.addButton( "High Scores" );
        return menu.getButtons();
    }

    return self;

}

}
