const AGENT_COLORS = {
    'a': "#0F0",
    'b': "#F0F",
    'c': "#FF0",
    'd': "#F00",
};

const AGENT_SEEKS = {
    "a": "3bcd",
    "b": "2",
    "c": "b",
    "d": "b"
};

const AGENT_AVOIDS = {
    "a": "ad12",
    "b": "acd1",
    "c": "",
    "d": "a"
};

const AGENT_RADIUS = 5;

const AGENT_SPEED = 0.1;

export default function (type, location) {

    const self = {};

    const color = AGENT_COLORS[type];
    const seeks = AGENT_SEEKS[type];
    const avoids = AGENT_AVOIDS[type];

    let others;

    self.setOthers = (o) => others = o;

    self.update = function (elapsedTime) {
        const seek = others.filter( wantToSeek );
        const avoid = others.filter( wantToAvoid );
        const seekDirection = addDirection( seek );
        const avoidDirection = addDirection( avoid );
        const newDirection = {
            x: seekDirection.x - avoidDirection.x,
            y: seekDirection.y - avoidDirection.y
        };
        const directionMag = Math.sqrt( newDirection.x*newDirection.x + newDirection.y*newDirection.y );
        if (directionMag === 0) return;
        const velocityX = AGENT_SPEED * elapsedTime * newDirection.x / directionMag;
        const velocityY = AGENT_SPEED * elapsedTime * newDirection.y / directionMag;
        location.x -= velocityX;
        location.y -= velocityY;
    };

    const wantToSeek = (entity) => seeks.includes( entity.type );

    const wantToAvoid = (entity) => avoids.includes( entity.type );

    const addDirection = (entities) =>
       entities.map( invert ).reduce( total, { x: 0, y: 0 } );

    const invert = function (entity) {
        const distanceSquared = entity.x*entity.x + entity.y*entity.y;
        return {
            x: entity.x / distanceSquared,
            y: entity.y / distanceSquared
        }
    };

    const total = function (accumulated, current) {
        accumulated.x += current.x;
        accumulated.y += current.y;
        return accumulated;
    };

    self.state = function () {
        return {
            type: type,
            color: color,
            radius: AGENT_RADIUS,
            x: location.x,
            y: location.y
        };
    };

    return self;

}
