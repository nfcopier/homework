export default function (
    KeyCodes,
    Actions,
    Directions
) {

const LOWER_A_CODE = "a".charCodeAt( 0 );
const UPPER_A_CODE = "A".charCodeAt( 0 );

return function InputSystem(canvas) {

    const self = {};
    let actions = null;
    let mousePosition = { x: 0, y: 0};

    clearActions();

    self.startListening = function () {
        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const onKeyDown = function (e) {
        const xDirection = getDirectionX( e );
        if (xDirection) actions.move.x = getMoveActionFrom( xDirection );
        const yDirection = getDirectionY( e );
        if (yDirection) actions.move.y = getMoveActionFrom( yDirection );
        actions.other = getOtherActionFrom( e );
        if (isPrintable(e.keyCode)) appendText( e );
    };

    const onKeyUp = function (e) {
        const xDirection = getDirectionX( e );
        if (xDirection) actions.move.x = Actions.NONE;
        const yDirection = getDirectionY( e );
        if (yDirection) actions.move.y = Actions.NONE
    };

    const isPrintable = function (keyCode) {
        return keyCode > 48 && keyCode < 90;
    };

    const appendText = function (e) {
        if (e.altKey || e.ctrlKey || e.metaKey) return;
        actions.text += charFrom( e );

    };

    const charFrom = function (e) {
        if (e.shiftKey) return String.fromCharCode( e.keyCode );
        return String.fromCharCode( e.keyCode + LOWER_A_CODE - UPPER_A_CODE);
    };

    const getDirectionX = function (e) {
        switch (e.keyCode) {
            case KeyCodes.DOM_VK_A:
            case KeyCodes.DOM_VK_J:
            case KeyCodes.DOM_VK_LEFT:
                return Directions.LEFT;
            case KeyCodes.DOM_VK_D:
            case KeyCodes.DOM_VK_L:
            case KeyCodes.DOM_VK_RIGHT:
                return Directions.RIGHT;
            default:
                return null;
        }
    };

    const getDirectionY = function (e) {
        switch (e.keyCode) {
            case KeyCodes.DOM_VK_W:
            case KeyCodes.DOM_VK_I:
            case KeyCodes.DOM_VK_UP:
                return Directions.TOP;
            case KeyCodes.DOM_VK_S:
            case KeyCodes.DOM_VK_K:
            case KeyCodes.DOM_VK_DOWN:
                return Directions.BOTTOM;
            default:
                return null;
        }
    };

    const getMoveActionFrom = function (event) {
        switch (event) {
            case Directions.LEFT:
                return Actions.MOVE_LEFT;
            case Directions.RIGHT:
                return Actions.MOVE_RIGHT;
            case Directions.TOP:
                return Actions.MOUSE_UP;
            case Directions.BOTTOM:
                return Actions.MOVE_DOWN;
            default:
                return Actions.NONE;
        }
    };

    const getOtherActionFrom = function (e) {
        switch (e.keyCode) {
            case KeyCodes.DOM_VK_ESCAPE:
                return Actions.PAUSE_GAME;
            case KeyCodes.DOM_VK_BACK_SPACE:
                return Actions.BACK_SPACE;
            default:
                return Actions.NONE;
        }
    };

    const onMouseMove = function(event) {
        const canvasScale = canvas.getScale();
        mousePosition = {
            x: canvasScale.x * event.clientX,
            y: canvasScale.y * event.clientY
        };
    };

    const onMouseUp = function () {
        actions.mouseUp = Actions.MOUSE_UP;
    };

    self.getActions = function () {
        const currentActions = actions;
        clearActions();
        return currentActions;
    };

    function clearActions() {
        actions = {
            move: actions ? actions.move : { x: Actions.NONE, y: Actions.NONE},
            mousePosition: mousePosition,
            mouseUp: Actions.NONE,
            text: "",
            other: Actions.NONE
        };
    }

    return self;

}

}