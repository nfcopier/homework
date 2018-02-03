export default function ($) {

    function FooterRenderer() {
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    FooterRenderer.prototype._tagName = "div";
    FooterRenderer.prototype._className = "tile is-parent box";

    FooterRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.html(this._template());
        return this._parent;
    };

    FooterRenderer.prototype._template = function () { return `
        <div class="is-child">
            This is a test footer
        </div>
    `};

    return FooterRenderer;

}
