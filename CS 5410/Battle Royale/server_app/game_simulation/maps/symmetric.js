module.exports = function (Building) {

return function Symmetric() {

    const self = {};

    let buildings = [];

    const initialize = function() {
        buildings.push( buildingTemplate(0, "red") );
    };

    const buildingTemplate = function(rotation, color) {
        const transform = {
            x: 50, y: 50,
            width: 1000, height: 1500,
            theta: rotation
        };
        return Building( transform, color, [] );
    };

    self.buildings = () => buildings.map( data );

    const data = (building) => building.data();

    initialize();

    return self;

};

};
