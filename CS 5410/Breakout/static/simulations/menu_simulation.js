export default function () {

return function MenuSimulation(gameSimulation) {

    const self = {};

    self.hasContinueButton = !!gameSimulation;

    self.update = function () { };

    return self;

}

}
