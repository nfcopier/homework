export default function (
    KeyCodes,
    Actions
) {

    function InputSystem() {
        this.clear();
    }

    InputSystem.prototype.startListening = function () {
        window.addEventListener("keydown", this._onKeyDown.bind(this), false);
    };

    InputSystem.prototype._onKeyDown = function (e) {
        const action = _getActionFrom(e);
        if (_isMove(action)) {
            this._actions.moveAction = action;
        }
        if (action === Actions.TOGGLE_BREADCRUMBS)
            this._actions.toggleBreadcrumbs = action;
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
            case KeyCodes.DOM_VK_B:
                return Actions.TOGGLE_BREADCRUMBS;
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

    InputSystem.prototype.getActions = function () {
        return this._actions;
    };

    InputSystem.prototype.clear = function () {
        this._actions = {
            move: Actions.NONE,
            toggleHint: Actions.NONE,
            toggleScore: Actions.NONE,
            toggleBreadcrumbs: Actions.NONE,
            togglePAth: Actions.NONE
        };
    };

    return InputSystem;

}