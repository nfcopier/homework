export default function () {

    function GameRenderer(simulation) {
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "100%";
        this._canvas.style.height = "100%";
        this._canvas.width = 1024;
        this._canvas.height = 1024;
        this._context = this._canvas.getContext("2d");
        this._simulation = simulation;
    }

    GameRenderer.prototype.render = function (actions) {
        this._clearCanvas();
    };

    GameRenderer.prototype._clearCanvas = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    return GameRenderer;

}
