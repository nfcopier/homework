export default function ($) {

    function TickerRenderer(simulator) {
        this._simulator = simulator;
        this._parent = $(`<${this._tagName}>`).addClass(this._className);
    }

    TickerRenderer.prototype._tagName = "div";
    TickerRenderer.prototype.className = "tile is-child box";

    TickerRenderer.prototype.render = function () {
        this._parent.empty();
        const ticks = this._simulator.getTriggeredTicks().slice(-10);
        for (let tick in ticks) {
            if (!ticks.hasOwnProperty(tick)) continue;
            this._parent.append(this._renderTick(tick));
        }
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