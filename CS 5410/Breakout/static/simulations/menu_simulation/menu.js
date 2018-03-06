export default function () {

const BUTTON_WIDTH = 250;
const BUTTON_HEIGHT = 50;

return function Menu(name, transform) {

    const self = {};

    const buttons = [];
    const buttonX = (transform.width - BUTTON_WIDTH) / 2;

    const buttonTransform = {
        x: buttonX,
        y: 300,
        theta: 0,
        width: BUTTON_WIDTH,
        height: BUTTON_HEIGHT
    };

    self.addButton = function (text) {
        buttons.push({
            text: text,
            transform: Object.assign({}, buttonTransform),
            isDisabled: false
        });
        buttonTransform.y += 80;
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
            !button.isDisabled &&
            mouseLocation.x > button.transform.x &&
            mouseLocation.x < button.transform.x + button.transform.width &&
            mouseLocation.y > button.transform.y &&
            mouseLocation.y < button.transform.y + button.transform.height
        )
    };

    self.getName = function () { return name; };

    self.getButtons = function () { return buttons; };

    self.disable = function (buttonText) {
        for (let button of buttons) {
            button.isDisabled = button.text === buttonText;
        }
    };

    return self;
}

}
