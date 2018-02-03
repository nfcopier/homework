export default function () {

    function Simulation() {
        this._ticks = [];
        this._triggeredTicks = [];
    }

    Simulation.prototype.update = function (timeElapsed) {
        for (let tick in this._ticks) {
            if (!this._ticks.hasOwnProperty(tick)) continue;
            tick.timeElapsed -= timeElapsed;
            if (tick.timeElapsed < tick.remaining) continue;
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