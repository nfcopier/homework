export default function () {

    function Simulation() {
        this._ticks = [];
        this._triggeredTicks = [];
    }

    Simulation.prototype.update = function (timeElapsed) {
        for (let i = 0; i < this._ticks.length; i++) {
            this.updateTick(i, timeElapsed);
        }
    };

    Simulation.prototype.updateTick = function (index, timeElapsed) {
        const tick = this._ticks[index];
        if (!this._ticks.hasOwnProperty(tick)) return;
        tick.timeElapsed += timeElapsed;
        if (tick.timeElapsed < tick.interval) return;
        tick.timeElapsed = 0;
        tick.remaining -= 1;
        this._triggeredTicks.push({name: tick.name, remaining: tick.remaining});
        if (tick.remaining <= 0) {
            this._ticks.splice(index, 1);
        }
    };

    Simulation.prototype.getTriggeredTicks = function () {
        return this._triggeredTicks;
    };

    Simulation.prototype.addTick = function (newTick) {
        newTick.timeElapsed = 0;
        this._ticks.push(newTick);
    };

    return Simulation;

}