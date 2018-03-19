export default function ($) {

    function AddTickRenderer(simulator) {
        this._simulator = simulator;
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    AddTickRenderer.prototype._tagName = "div";
    AddTickRenderer.prototype._className = "tile is-4 is-parent";

    AddTickRenderer.prototype.render = function () {
        this._parent.empty();
        this._parent.html( this._template() );
        this._ui = {
            name_input: this._parent.find(".add-tick_name input"),
            name_validation: this._parent.find(".add-tick_name span"),
            interval_input: this._parent.find(".add-tick_interval input"),
            interval_validation: this._parent.find(".add-tick_interval span"),
            count_input: this._parent.find(".add-tick_count input"),
            count_validation: this._parent.find(".add-tick_count input span"),
            submit: this._parent.find(".add-tick_submit")
        };
        this._ui.submit.click(this._addTick.bind(this));
        return this._parent;
    };

    AddTickRenderer.prototype._addTick = function (event) {
        event.preventDefault();
        if (!this._validate()) return;
        const tick = {
            name: this._ui.name_input.val(),
            interval: +this._ui.interval_input.val(),
            remaining: +this._ui.count_input.val()
        };
        this._simulator.addTick( tick );
    };

    AddTickRenderer.prototype._validate = function () {
        return true;
    };

    AddTickRenderer.prototype._template = function () { return `
        <div class="tile is-child notification is-success">
            <form class="box">
                <div class="field">
                    <div class="label">Name</div>
                    <div class="control add-tick_name">
                        <input class="input" type="text" placeholder="pick any name, really...">
                        <span></span>
                    </div>
                </div>
                <div class="field">
                    <div class="label">Interval</div>
                    <div class="control add-tick_interval">
                        <input class="input" type="number" placeholder="in milliseconds...">
                        <span></span>
                    </div>
                </div>
                <div class="field">
                    <div class="label">Count</div>
                    <div class="control add-tick_count">
                        <input class="input" type="number" placeholder="a number greater than 1...">
                        <span></span>
                    </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-link add-tick_submit">Submit</button>
                  </div>
                </div>
            </form>
        </div>
    `};

    return AddTickRenderer;

}