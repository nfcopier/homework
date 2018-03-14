export default function (
    BrickShatteringEffect
) {

const registry = {
    "brick shattering" : BrickShatteringEffect
};

return function () {

    const self = {};

    let masterList = [];

    self.addEffect = function (type, color, transform) {
        const Effect = registry[type];
        if (!Effect) return;
        const effect = Effect( color, transform );
        masterList.push( effect );
    };

    self.getEffects = function () { return masterList; };

    self.reset = function () {
        masterList.length = 0;
    };

    self.update = function (elapsedTime) {
        const keepMe = [];
        for (let particleEffect of masterList) {
            particleEffect.update( elapsedTime );
            if (particleEffect.isAlive()) keepMe.push( particleEffect );
        }
        masterList = keepMe;
    };

    return self;

}

}
