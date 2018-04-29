export default function () {

let id = 0;

return function Slots() {

    const self = {};

    let slots = [];

    self[Symbol.iterator] = function*() { yield* slots; };

    self.add = function(clicksPerWeek) {
        slots.push({ id: ++id, clicks: clicksPerWeek })
    };

    self.remove = function (victim) {
        slots = slots.filter( s => s.id !== victim.id );
    };

    self.toArray = () => Array.from( self );

    return self;

}

}
