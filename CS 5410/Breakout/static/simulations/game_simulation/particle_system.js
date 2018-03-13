export default function () {

return function () {

    const self = {};

    let masterList = [];

    self.addEffect = function ( type, transform) { };

    self.getParticles = function () { return masterList; };

    self.reset = function () {
        masterList.length = 0;
    };

    self.update = function (elapsedTime) {
        const keepMe = [];
        for (let particleEffect of masterList) {
            particleEffect.update( elapsedTime );
            if (particleEffect.isAlive() > 0) keepMe.push( particle );
        }
        masterList = keepMe;
    };

    return self;

}

}
