export default function (Walls) {

    function WallRenderer(context, walls, width, height) {
        this._context = context;
        this._walls = walls;
        this._width = width;
        this._height = height;
    }

    WallRenderer.prototype.render = function () {
        const walls = this._walls;
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

    WallRenderer.prototype._renderTopWall = function () {
        this._context.beginPath();
        this._context.moveTo(0, 0);
        this._context.lineTo(this._width, 0);
        this._context.stroke();
    };

    WallRenderer.prototype._renderBottomWall = function () {
        this._context.beginPath();
        this._context.moveTo(0, this._height);
        this._context.lineTo(this._width, this._height);
        this._context.stroke();
    };

    WallRenderer.prototype._renderLeftWall = function () {
        this._context.beginPath();
        this._context.moveTo(0, 0);
        this._context.lineTo(0, this._height);
        this._context.stroke();
    };

    WallRenderer.prototype._renderRightWall = function () {
        this._context.beginPath();
        this._context.moveTo(this._width, 0);
        this._context.lineTo(this._width, this._height);
        this._context.stroke();
    };

    return WallRenderer;

}