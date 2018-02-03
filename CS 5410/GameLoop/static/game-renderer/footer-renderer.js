export default function ($) {

    function FooterRenderer() {
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    FooterRenderer.prototype._tagName = "div";
    FooterRenderer.prototype._className = "tile is-parent is-12";

    FooterRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.html(this._template());
        return this._parent;
    };

    FooterRenderer.prototype._template = function () { return `
        <div class="tile is-child notification is-danger">
            <div class="level">
                <span class="level-left">Created For CS 5410</span>
                <span class="level-right">
                    <p>
                        Built Using
                        <a href="http://jquery.com/" target="_blank">jQuery</a>
                        And
                        <a href="https://bulma.io/" target="_blank">Bulma</a>
                    </p>
                </span>
            </div>
        </div>
    `};

    return FooterRenderer;

}
