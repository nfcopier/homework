export default function () {

    function GameRenderer(simulator) {
        this._canvas = document.createElement("canvas");
        this._context = this._canvas.getContext("2d");
    }


    GameRenderer.prototype.render = function () {
        this._clearCanvas();
        return this._canvas;
    };

    GameRenderer.prototype._clearCanvas = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    return GameRenderer;

}
