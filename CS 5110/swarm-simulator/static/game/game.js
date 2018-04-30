import Agent from "./agent.js"

const ENVIRON_COLORS = {
    '1': "#CCC",
    '2': "#8b4513",
    '3': "#444"
};

const ENTITY_SIGHT_SQUARED = 10000;

const ENVIRON_RADIUS = 5;

export default function () {

    const self = {};

    let environs = [];
    let agents = [];
    let isRunning = false;

    self.update = function (input, elapsedTime) {
        if (input.addEntity)
            addEntity( input.entity, input.mouseLocation);
        updateControlFrom( input.control );
        if (!isRunning) return;
        agents.forEach( setOthers );
        agents.forEach( update( elapsedTime ) )
    };

    const addEntity = function (type, location) {
        if (isOnTopOfExisting(location)) return;
        if ("123".includes(type))
            addEnviron( type, location );
        if ("abcd".includes(type))
            addAgent( type, location );
    };

    let distanceBetween = function (one, two) {
        return (one.x - two.x) * (one.x - two.x) +
            (one.y - two.y) * (one.y - two.y);
    };

    const isOnTopOfExisting = function (location) {
        for (let entity of self.entities()) {
            const distanceSquared = distanceBetween( location, entity );
            if (distanceSquared < 100) return true;
        }
        return false;
    };

    const addEnviron = function (type, location) {
        const color = ENVIRON_COLORS[type];
        environs.push({
            color: color,
            type: type,
            radius: ENVIRON_RADIUS,
            x: location.x,
            y: location.y
        });
    };

    const addAgent = function(type, location) {
        const agent = Agent( type, location );
        agents.push( agent );
    };

    const updateControlFrom = function(controlState) {
        if (controlState === "reset") resetEntities();
        if (controlState === "pause" || controlState === "reset")
            isRunning = false;
        if (controlState === "play") isRunning = true;
    };

    const resetEntities = function () {
        environs = [];
        agents = [];
    };

    const setOthers = function (entity) {
        const others =
                  agents.filter( e => e !== entity )
                  .map( agentState )
                  .concat( environs )
                  .filter( isWithinSightOf( entity.state() ) )
                  .map( relativeTo( entity.state() ) );
        entity.setOthers( others );
    };

    const isWithinSightOf = (entity) => function (other) {
        const distanceSquared =
                  (entity.x-other.x)*(entity.x-other.x) + (entity.y-other.y)*(entity.y-other.y);
        return distanceSquared < ENTITY_SIGHT_SQUARED;
    };

    const relativeTo = (entity) => function (other) {
        return {
            x: entity.x - other.x,
            y: entity.y - other.y,
            type: other.type
        };
    };

    const update = (elapsedTime) => (entity) => entity.update( elapsedTime );

    self.entities = () => environs.concat( agents.map( agentState ) );

    const agentState = (agent) => agent.state();

    return self;

}
