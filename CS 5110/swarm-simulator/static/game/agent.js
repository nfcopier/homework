const AGENT_COLORS = {
    'a': "#0F0",
    'b': "#F0F",
    'c': "#FF0",
    'd': "#F00",
};

export default function (type, location) {

    const self = {};

    const color = AGENT_COLORS[type]

    self.update = function (others, elapsedTime) {};

    self.state = function () {
        return {
            color: color,
            location: location
        };
    };

    return self;

}
