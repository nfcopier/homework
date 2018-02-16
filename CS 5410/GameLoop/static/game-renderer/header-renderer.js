export default function ($) {

    function HeaderRenderer() {
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    HeaderRenderer.prototype._tagName = "div";
    HeaderRenderer.prototype._className = "tile is-parent";

    HeaderRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.html(this._template());
        return this._parent;
    };

    HeaderRenderer.prototype._template = function () { return `
        <div class="tile is-child notification is-primary level">
            <h1 class="title is-1 level-item">Browser Game Loop</h1>
        </div>
    `};

    return HeaderRenderer;

}
