export default function (
    KeyCodes,
    Actions,
    Directions
) {

return function InputSystem(canvas) {

    const self = {};
    let actions = null;

    clearActions();

    self.startListening = function () {
        window.addEventListener("keydown", onKeyDown, false);
        window.addEventListener("keyup", onKeyUp, false);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const onKeyDown = function (e) {
        const direction = getDirection( e );
        if (direction) actions.move = getMoveActionFrom( direction );
        actions.other = getOtherActionFrom( e );
    };

    const onKeyUp = function (e) {
        const moveEvent = getDirection( e );
        if (moveEvent) actions.move = Actions.STOP_PADDLE
    };

    const getDirection = function (e) {
        switch (e.keyCode) {
            case KeyCodes.DOM_VK_W:
            case KeyCodes.DOM_VK_I:
            case KeyCodes.DOM_VK_UP:
                return Directions.TOP;
            case KeyCodes.DOM_VK_S:
            case KeyCodes.DOM_VK_K:
            case KeyCodes.DOM_VK_DOWN:
                return Directions.BOTTOM;
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

    const getMoveActionFrom = function (event) {
        switch (event) {
            case Directions.LEFT:
                return Actions.MOVE_LEFT;
            case Directions.RIGHT:
                return Actions.MOVE_RIGHT;
            case Directions.TOP:
                return Actions.MOVE_UP;
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
            default:
                return Actions.NONE;
        }
    };

    const onMouseMove = function(event) {
        const canvasScale = canvas.getScale();
        actions.mouseMove = {
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
            move: Actions.NONE,
            mouseMove: Actions.NONE,
            mouseUp: Actions.NONE,
            other: Actions.NONE
        };
    }

    return self;

}

}