export default function (
    WallRenderer,
    PlayerRenderer,
    EntranceRenderer,
    ExitRenderer,
    BreadcrumbRenderer
) {

    function CellRenderer(context, cell, width, height, extras) {
        this._context = context;
        this._cell = cell;
        this._width = width;
        this._height = height;
        this._extras = extras;
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
        if (this._extras.breadcrumbs)
            this._renderBreadcrumbs();
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

    CellRenderer.prototype._renderBreadcrumbs = function () {
        const context = this._context;
        const breadcrumbs = this._cell.breadcrumbs;
        const renderer = new BreadcrumbRenderer(context, breadcrumbs, this._width, this._height);
        renderer.render();
    };

    return CellRenderer;

}