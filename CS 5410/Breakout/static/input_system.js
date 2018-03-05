export default function (
    KeyCodes,
    Actions
) {

    function InputSystem(canvas) {
        this.clear();
        this._canvas = canvas;
    }

    InputSystem.prototype.startListening = function () {
        window.addEventListener("keydown", this._onKeyDown.bind(this), false);
        window.addEventListener("mousemove", this._onMouseMove.bind(this));
        window.addEventListener("mouseup", this._onMouseUp.bind(this));
    };

    InputSystem.prototype._onKeyDown = function (e) {
        const action = _getActionFrom(e);
        if (_isMove(action))
            this._actions.moveAction = action;
        if (action === Actions.PAUSE_GAME)
            this._actions.pause = action;
    };

    function _getActionFrom(e) {
        switch (e.keyCode) {
            case KeyCodes.DOM_VK_W:
            case KeyCodes.DOM_VK_I:
            case KeyCodes.DOM_VK_UP:
                return Actions.MOVE_UP;
            case KeyCodes.DOM_VK_S:
            case KeyCodes.DOM_VK_K:
            case KeyCodes.DOM_VK_DOWN:
                return Actions.MOVE_DOWN;
            case KeyCodes.DOM_VK_A:
            case KeyCodes.DOM_VK_J:
            case KeyCodes.DOM_VK_LEFT:
                return Actions.MOVE_LEFT;
            case KeyCodes.DOM_VK_D:
            case KeyCodes.DOM_VK_L:
            case KeyCodes.DOM_VK_RIGHT:
                return Actions.MOVE_RIGHT;
            case KeyCodes.DOM_VK_ESCAPE:
                return Actions.PAUSE_GAME;
        }
    }

    function _isMove(action) {
        return (
            action === Actions.MOVE_UP ||
            action === Actions.MOVE_DOWN ||
            action === Actions.MOVE_LEFT ||
            action === Actions.MOVE_RIGHT
        );
    }

    InputSystem.prototype._onMouseMove = function(event) {
        const canvasScale = this._canvas.getScale();
        this._actions.mouseMove = {
            x: canvasScale.x * event.clientX,
            y: canvasScale.y * event.clientY
        };
    };

    InputSystem.prototype._onMouseUp = function () {
        this._actions.mouseUp = Actions.MOUSE_UP;
    };

    InputSystem.prototype.getActions = function () {
        return this._actions;
    };

    InputSystem.prototype.clear = function () {
        this._actions = {
            move: Actions.NONE,
            mouseMove: Actions.NONE,
            mouseUp: Actions.NONE,
            pause: Actions.NONE
        };
    };

    return InputSystem;

}