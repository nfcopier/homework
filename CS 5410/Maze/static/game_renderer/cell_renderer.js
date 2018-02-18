export default function (WallRenderer) {

    function CellRenderer(context, cell, width, height) {
        this._context = context;
        this._cell = cell;
        this._width = width;
        this._height = height;
        this._wallRenderer = new WallRenderer(context, cell.walls, width, height);
    }

    CellRenderer.prototype.render = function () {
        this._wallRenderer.render();
    };

    return CellRenderer;

}