export default function (
    HeaderRenderer,
    ContentRenderer,
    FooterRenderer,
    $
) {

    function GameRenderer(simulator) {
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
        $("body").append(this._parent);
        this._header = new HeaderRenderer();
        this._content = new ContentRenderer( simulator );
        this._footer = new FooterRenderer();
    }

    GameRenderer.prototype._tagName = "div";
    GameRenderer.prototype._className = "tile is-ancestor is-vertical";

    GameRenderer.prototype.render = function () {
        if (!this._isRendered) {
            this._isRendered = true;
            this._parent.empty();
            this._parent.append(this._header.render());
            this._parent.append(this._content.render());
            this._parent.append(this._footer.render());
        } else {
            this._content.render();
        }
        return this._parent;
    };

    return GameRenderer;

}
