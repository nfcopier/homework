export default function (Actions) {

return function MenuSimulation(gameSimulation) {

    const self = {};

    self.transform = {
        x: 0,
        y: 0,
        theta: 0,
        width: 1024,
        height: 768
    };

    const buttons = [];
    const buttonWidth = 300;
    const buttonX = (self.transform.width-buttonWidth)/2;
    const buttonTransform = {
        x: buttonX,
        y: 300,
        theta: 0,
        width: buttonWidth,
        height: 75
    };

    let addButton = function (text) {
        buttons.push({
            text: text,
            transform: Object.assign({}, buttonTransform)
        });
        buttonTransform.y += 125;
    };
    if (gameSimulation) {
        addButton( "Resume Game" );
    }
    addButton( "New Game" );
    addButton( "High Scores" );

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

    return self;

}

}
