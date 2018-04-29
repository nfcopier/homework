export default function () {

const OBSTACLE_COUNT = 15;

return function (squareFactory) {

    const self = {};

    const children = [];

    const init = function() {
        for (let i = 0; i < OBSTACLE_COUNT; i++) {
            self.spawnObstacle();
        }
    };

    self.spawnObstacle = function () {
        const newObstacle = squareFactory.spawnRandom();
        if (!self.intersects(newObstacle))
            children.push( newObstacle );
        else
            self.spawnObstacle();
    };

    self.intersects = function(other) {
        for (let child of children) {
            if (child.intersects(other))
                return true;
        }
        return false;
    };

    self.children = () => children;

    init();

    return self;

}

}
