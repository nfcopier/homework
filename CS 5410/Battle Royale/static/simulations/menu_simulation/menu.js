export default function() {

    const BUTTON_WIDTH = 250;
    const BUTTON_HEIGHT = 50;

    return function Menu(name, transform) {

        const self = {};

        const buttons = [];
        const textFields = [];
        let currentField = null;
        const buttonX = (transform.width - BUTTON_WIDTH) / 2;

        const fieldTransform = {
            x     : buttonX,
            y     : 300,
            theta : 0,
            width : BUTTON_WIDTH,
            height: BUTTON_HEIGHT
        };

        self.addButton = function(text) {
            buttons.push({
                text      : text,
                transform : Object.assign({}, fieldTransform),
                isDisabled: false
            });
            fieldTransform.y += 80;
        };

        self.addTextField = function(placeholder) {
            textFields.push({
                placeholder: placeholder,
                transform  : Object.assign({}, fieldTransform),
                text       : null
            });
            fieldTransform.y += 80;
        };

        self.appendText = function(characters) {
            if (!currentField) return;
            currentField.text += characters;
        };

        self.backspace = function() {
            if (!currentField) return;
            currentField.text = currentField.text.slice(0, -1);
        };

        self.handleClick = function() {
            for (let field of textFields) {
                if (field.hasMouse) {
                    currentField = field;
                    if (!currentField.text) currentField.text = "";
                    return;
                }
            }
            if (!currentField) return;
            if (!currentField.text.length) currentField.text = null;
            currentField = null;
        };

        self.updateFields = function(mouseLocation) {
            for (let button of buttons) {
                button.hasMouse = checkCollision(button, mouseLocation);
            }
            for (let field of textFields) {
                field.hasMouse = checkCollision(field, mouseLocation);
            }
        };

        self.getSelectedButton = function() {
            for (let button of buttons) {
                if (button.hasMouse) return button.text;
            }
            return null;
        };

        const checkCollision = function(field, mouseLocation) {
            return (
                !field.isDisabled &&
                mouseLocation.x > field.transform.x &&
                mouseLocation.x < field.transform.x + field.transform.width &&
                mouseLocation.y > field.transform.y &&
                mouseLocation.y < field.transform.y + field.transform.height
            );
        };

        self.getName = function() { return name; };

        self.getButtons = function() { return buttons; };

        self.getTextFields = () => textFields;

        self.getValues = function() {
            return textFields.reduce((acc, current) => {
                acc[current.placeholder] = current.text;
                return acc;
            }, {});
        };

        self.disable = function(buttonText) {
            for (let button of buttons) {
                button.isDisabled = button.text === buttonText;
            }
        };

        return self;
    };

}
