module.exports = function (
    Building,
    PowerUp
) {

return function Symmetric() {

    const self = {};

    let spawnPoints;
    let powerUps;
    let buildings = [];

    const initialize = function() {
        initializeSpawns();
        const centerTransform = {
            x: -500, y: -500,
            width: 1000, height: 1000,
            theta: 0
        };
        initializePowerUps();
        const wallSpecs = centerBuildingWalls();
        buildings.push( Building( centerTransform, "white", wallSpecs ) );
        // buildings.push( buildingTemplate(0, "red") );
    };

    const initializeSpawns = function () {
        spawnPoints = [
            { x: -400, y: -400 },
            { x: 400, y: -400 },
            { x: 400, y: 400 },
            { x: -400, y: 400 }
        ];
    };

    const initializePowerUps = function () {
        powerUps = [
            PowerUp( { x: -10, y: -10 }, "missile" ),
            PowerUp( { x: -600, y: -600 }, "health" ),
            PowerUp( { x: 580, y: -600 }, "bullets" ),
            PowerUp( { x: -600, y: 580 }, "bullets" ),
            PowerUp( { x: 580, y: 580 }, "health" )
        ];
    };

    const centerBuildingWalls = function () {
        return [
            { p1: { x: 10, y: 10}, p2: { x: 440, y: 10 } },
            { p1: { x: 560, y: 10}, p2: { x: 990, y: 10 } },
            { p1: { x: 10, y: 990}, p2: { x: 440, y: 990 } },
            { p1: { x: 560, y: 990}, p2: { x: 990, y: 990 } },
            { p1: { x: 10, y: 10}, p2: { x: 10, y: 440 } },
            { p1: { x: 10, y: 560}, p2: { x: 10, y: 990 } },
            { p1: { x: 990, y: 10}, p2: { x: 990, y: 440 } },
            { p1: { x: 990, y: 560}, p2: { x: 990, y: 990 } }
        ];
    };

    const buildingTemplate = function(rotation, color) {
        const transform = {
            x: 1500, y: 1500,
            width: 500, height: 500,
            theta: rotation
        };
        return Building( transform, color, [] );
    };

    self.buildingData = () => buildings.map( data );

    const data = (building) => building.data();

    self.randomSpawnPoint = function() {
        return spawnPoints[ Math.floor( Math.random() * spawnPoints.length) ];
    };

    self.buildings = () => buildings;

    self.powerUps = () => powerUps;

    initialize();

    return self;

};

};
