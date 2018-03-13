export default function () {

return function (particleSystem, graphics) {
    
    const self = {};

    const particles = particleSystem.getParticles();
    
    self.render = function () {
        for (let particle of particles) {}
    };
    
    return self;
    
}

}
