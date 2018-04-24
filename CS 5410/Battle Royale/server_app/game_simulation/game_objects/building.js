module.exports = function (
    Wall,
    CollisionDetector,
    GameObject
) {

return function Building(transform, color, wallSpecs) {

    const self = GameObject( transform );

    const walls = wallSpecs.map( (spec) => Wall( self, spec.p1, spec.p2 ) );

    self.walls = () => walls;

    self.data = function () {
        return {
            transform: transform,
            color,
            walls: wallSpecs
        };
    };

    self.doCollisionWithPlayer = function (player) {
        if (player.isDead()) return;
        const detector = CollisionDetector( transform, player.getTransform() );
        if (!detector.collisionOccurred()) return;
        for (let wall of walls)
            wall.doCollisionWithPlayer( player );
        for (let wall of walls)
            wall.doCollisionWithPlayer( player );
    };

    self.doCollisionWithProjectile = function (projectile) {
        if (!projectile.isActive()) return;
        const detector = CollisionDetector( transform, projectile.getTransform() );
        if (!detector.collisionOccurred()) return;
        for (let wall of walls)
            wall.doCollisionWithProjectile( projectile );
    };

    return self;

};

};
