import Agent from "./agent.js"

const ENVIRON_COLORS = {
    '1': "#CCC",
    '2': "#8b4513",
    '3': "#444"
};

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
        agents.forEach( update( elapsedTime ) )
    };

    const addEntity = function (type, location) {
        if (type in ['1', '2', '3'])
            addEnviron( type, location );
        if (type in ['a', 'b', 'c', 'd'])
            addAgent( type, location );
    };

    const addEnviron = function (type, location) {
        const color = ENVIRON_COLORS[type];
        environs.push({ color: color, type: type, location: location });
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

    const update = (elapsedTime) => function(entity) {};

    self.state = () => environs.concat( agents.map( agentState ) );

    const agentState = (agent) => agent.state();

    return self;

}
