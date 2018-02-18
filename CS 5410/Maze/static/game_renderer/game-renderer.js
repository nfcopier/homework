export default function (
    CellRenderer
) {

    function GameRenderer(simulation) {
        this._canvas = document.createElement("canvas");
        this._canvas.style.width = "50%";
        this._canvas.style.height = "50%";
        this._canvas.width = 1024;
        this._canvas.height = 1024;
        this._context = this._canvas.getContext("2d");
        this._simulation = simulation;
    }


    GameRenderer.prototype.render = function () {
        this._clearCanvas();
        const maze = this._simulation.maze();
        const cellWidth = this._canvas.width / (maze[0].length || 1);
        const cellHeight = this._canvas.height / (maze.length || 1);
        for (let row of maze) {
            for (let cell of row) {
                let cellRenderer = new CellRenderer(this._context, cell, cellWidth, cellHeight);
                cellRenderer.render();
                this._context.translate(cellWidth, 0);
            }
            this._context.translate(-this._canvas.width, cellHeight);
        }
        this._context.translate(0, -this._canvas.height);
    };

    GameRenderer.prototype._clearCanvas = function () {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    };

    return GameRenderer;

}
