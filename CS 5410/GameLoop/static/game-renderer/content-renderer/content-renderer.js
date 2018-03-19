export default function (
    TickerRenderer,
    AddTickRenderer,
    $
) {

    function ContentRenderer(simulator) {
        this._isRendered = false;
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
        this._ticker = new TickerRenderer( simulator );
        this._addTick = new AddTickRenderer( simulator );
    }

    ContentRenderer.prototype._tagName = "div";
    ContentRenderer.prototype._className = "tile";

    ContentRenderer.prototype.render = function () {
        if (!this._isRendered) {
            this._isRendered = true;
            this._parent.empty();
            this._parent.append(this._ticker.render());
            this._parent.append(this._addTick.render());
        } else {
            this._ticker.render();
        }
        return this._parent;
    };

    return ContentRenderer;

}