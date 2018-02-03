export default function ($) {

    function HeaderRenderer() {
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    HeaderRenderer.prototype._tagName = "div";
    HeaderRenderer.prototype._className = "tile is-parent box";

    HeaderRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.html(this._template());
        return this._parent;
    };

    HeaderRenderer.prototype._template = function () { return `
        <div class="is-child">
            Browser Game Loop
        </div>
    `};

    return HeaderRenderer;

}
