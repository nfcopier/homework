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

    self.doCollisionWithPlayer = function (player, elapsedTime) {
        if (player.isDead()) return;
        const detector = CollisionDetector( transform, player.getTransform() );
        if (!detector.collisionOccurred()) return;
        for (let wall of walls)
            wall.doCollisionWithPlayer( player, elapsedTime );
        for (let wall of walls)
            wall.doCollisionWithPlayer( player, elapsedTime );
    };

    return self;

};

};
