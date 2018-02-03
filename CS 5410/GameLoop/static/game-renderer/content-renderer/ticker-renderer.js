export default function ($) {

    function TickerRenderer(simulator) {
        this._simulator = simulator;
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    TickerRenderer.prototype._tagName = "div";
    TickerRenderer.prototype._className = "tile is-8 is-parent";

    TickerRenderer.prototype.render = function () {
        const container = $("<div>").addClass("tile is-child notification is-warning");
        const ticks = this._simulator.getTriggeredTicks().slice(-10);
        for (let tick in ticks) {
            if (!ticks.hasOwnProperty(tick)) continue;
            container.append(this._renderTick(tick));
        }
        this._parent.empty().append(container);
        return this._parent;
    };

    TickerRenderer.prototype._renderTick = function (tick) {
      const el = $("div");
      el.html(`
        Event: ${tick.name} (${tick.remaining} remaining)
      `);
      return el;
    };

    return TickerRenderer;

}