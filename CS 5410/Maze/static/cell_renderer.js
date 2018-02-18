export default function (Walls) {

    function CellRenderer(context, cell, width, height) {
        this._context = context;
        this._cell = cell;
        this._width = width;
        this._height = height;
    }

    CellRenderer.prototype.render = function () {
        const walls = this._cell.walls;
        if (walls & Walls.TOP) {
            this._renderTopWall();
        }
        if (walls & Walls.BOTTOM) {
            this._renderBottomWall();
        }
        if (walls & Walls.LEFT) {
            this._renderLeftWall();
        }
        if (walls & Walls.RIGHT) {
            this._renderRightWall();
        }
    };

    CellRenderer.prototype._renderTopWall = function () {
        this._context.beginPath();
        this._context.moveTo(0, 0);
        this._context.lineTo(this._width, 0);
        this._context.stroke();
    };

    CellRenderer.prototype._renderBottomWall = function () {
        this._context.beginPath();
        this._context.moveTo(0, this._height);
        this._context.lineTo(this._width, this._height);
        this._context.stroke();
    };

    CellRenderer.prototype._renderLeftWall = function () {
        this._context.beginPath();
        this._context.moveTo(0, 0);
        this._context.lineTo(0, this._height);
        this._context.stroke();
    };

    CellRenderer.prototype._renderRightWall = function () {
        this._context.beginPath();
        this._context.moveTo(this._width, 0);
        this._context.lineTo(this._width, this._height);
        this._context.stroke();
    };

    return CellRenderer;

}