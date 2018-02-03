export default function (
    TickerRenderer,
    AddTickRenderer,
    $
) {

    function ContentRenderer(simulator) {
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
        this._ticker = new TickerRenderer( simulator );
        this._addTick = new AddTickRenderer( simulator );
    }

    ContentRenderer.prototype._tagName = "div";
    ContentRenderer.prototype._className = "tile is-parent";

    ContentRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.append( this._ticker.render() );
        this._parent.append( this._addTick.render() );
        return this._parent;
    };

    return ContentRenderer;

}