export default function (
    random
) {

const ParticleCount = {
    ROW: 50,
    COLUMN: 25
};

const ParticleSpeed = { MEAN: 0.07, STD_DEV: 0.025 };
const ParticleLifetime = { MEAN: 500, STD_DEV: 200 };

return function BrickShatteringEffect(color, transform) {

    const self = {};

    const particleWidth = transform.width / ParticleCount.ROW;
    const particleHeight = transform.height / ParticleCount.COLUMN;
    const particleSize = Math.min( particleWidth, particleHeight );

    let particles = [];

    const createParticles = function* () {
        for (let i = 0; i < ParticleCount.ROW; i++) {
            for (let j = 0; j < ParticleCount.COLUMN; j++) {
                let speed = random.Gaussian( ParticleSpeed.MEAN, ParticleSpeed.STD_DEV );
                let lifetime = random.Gaussian( ParticleLifetime.MEAN, ParticleLifetime.STD_DEV );
                yield {
                    x: i * particleWidth,
                    y: j * particleHeight,
                    size: particleSize,
                    velocity: { x: 0, y: Math.abs(speed) },
                    lifetime: lifetime
                }
            }
        }
    };

    self.getParticles = function () { return particles; };

    self.update = function (elapsedTime) {
        const toKeep = [];
        for (let particle of particles) {
            particle.lifetime -= elapsedTime;
            if (particle.lifetime > 0) toKeep.push( particle );
        }
        particles = toKeep;
        for (let particle of particles) {
            particle.x += particle.velocity.x * elapsedTime;
            particle.y += particle.velocity.y * elapsedTime;
        }
    };

    self.isAlive = function () { return particles.length > 0; };

    self.getTransform = function () { return transform; };

    self.getColor = function () { return color; };

    particles = Array.from( createParticles() );

    return self;

}

}
