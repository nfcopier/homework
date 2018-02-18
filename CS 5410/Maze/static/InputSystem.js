export default function (Actions) {

    function InputSystem() { }

    InputSystem.prototype.startListening = function () {
        window.addEventListener("keydown", this._onKeyDown, false);
    };

    InputSystem.prototype._onKeyDown = function (e) {
        const action = _getActionFrom(e);
    };

    function _getActionFrom(e) {
        switch (e.keyCode) {
            // case e.
        }
    }

    return InputSystem;

}