export default function (
    Renderer
) {

return function (effect) {
    
    const self = Renderer( effect.getTransform() );

    const particles = effect.getParticles();
    const color = effect.getColor();
    
    self.render = function () {
        for (let particle of particles) {
            drawParticle( particle );
        }
    };

    const drawParticle = function (particle) {
        const spec = {
            upperLeft: { x: particle.x, y: particle.y },
            bottomRight: {
                x: particle.size,
                y: particle.size
            },
            color: color
        };
        self.graphics.drawRectangle( spec );
    };
    
    return self;
    
}

}
