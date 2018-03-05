export default function () {

const BUTTON_WIDTH = 250;
const BUTTON_HEIGHT = 50;

return function Menu(transform) {

    const self = {};

    const buttons = [];
    const buttonX = (transform.width - BUTTON_WIDTH) / 2;

    const buttonTransform = {
        x: buttonX,
        y: 250,
        theta: 0,
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT
    };

    self.addButton = function (text) {
        buttons.push({
            text: text,
            transform: Object.assign({}, buttonTransform)
        });
        buttonTransform.y += 100;
    };

    self.updateButtons = function (mouseLocation) {
        for (let button of buttons) {
            button.hasMouse = checkCollision( button, mouseLocation );
        }
    };

    self.getSelectedButton = function () {
        for (let button of buttons) {
            if ( button.hasMouse) return button.text;
        }
        return null;
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
