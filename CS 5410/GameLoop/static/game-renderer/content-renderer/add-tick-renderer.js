export default function ($) {

    function AddTickRenderer(simulator) {
        this._simulator = simulator;
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    AddTickRenderer.prototype._tagName = "div";
    AddTickRenderer.prototype._className = "tile is-child box";

    AddTickRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.html( this._template() );
        this._parent.find(".submit").click(this._addTick.bind(this));
        return this._parent;
    };

    AddTickRenderer.prototype._template = function () { return `
    `};

    AddTickRenderer.prototype._addTick = function () {
        // TODO: Get this from html
        const tick = {
            name: "",
            interval: "",
            remaining: ""
        };
        this._simulator.addTick( tick );
    };

    return AddTickRenderer;

}