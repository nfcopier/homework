export default function (
    WallRenderer,
    PlayerRenderer,
    EntranceRenderer,
    ExitRenderer
) {

    function CellRenderer(context, cell, width, height) {
        this._context = context;
        this._cell = cell;
        this._width = width;
        this._height = height;
        this._wallRenderer = new WallRenderer(context, cell.walls, width, height);
        this._playerRenderer = new PlayerRenderer(this._context, this._width, this._height);
    }

    CellRenderer.prototype.render = function () {
        this._wallRenderer.render();
        if (this._cell.hasPlayer)
            this._renderPlayer();
        if (this._cell.hasEntrance)
            this._renderEntrance();
        if (this._cell.hasExit)
            this._renderExit();
    };

    CellRenderer.prototype._renderEntrance = function () {
        const renderer = new EntranceRenderer(this._context, this._width, this._height);
        renderer.render();
    };

    CellRenderer.prototype._renderExit = function () {
        const renderer = new ExitRenderer(this._context, this._width, this._height);
        renderer.render();
    };

    CellRenderer.prototype._renderPlayer = function () {
        this._playerRenderer.render();
    };

    return CellRenderer;

}