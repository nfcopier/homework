export default function () {

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
    const buttonWidth = 400;
    const buttonX = (self.transform.width-buttonWidth)/2;
    const buttonTransform = {
        x: buttonX,
        y: 400,
        theta: 0,
        width: 200,
        height: 50
    };

    let addButton = function (text) {
        buttons.push({
            text: text,
            transform: Object.assign({}, buttonTransform)
        });
        buttonTransform.y += 250;
    };
    if (gameSimulation) {
        addButton( "Resume Game" );
    }
    addButton( "New Game" );
    addButton( "High Scores" );

    self.update = function () { };

    self.getButtons = function () {
        return buttons;
    };

    return self;

}

}
