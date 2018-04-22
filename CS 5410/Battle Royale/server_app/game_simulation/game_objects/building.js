module.exports = function (GameObject) {

return function Building(transform, color, walls) {

    const self = GameObject( transform );

    self.walls = () => walls;

    self.data = function () {
        return {
            transform: transform,
            color,
            walls: walls
        };
    };

    return self;

};

};
