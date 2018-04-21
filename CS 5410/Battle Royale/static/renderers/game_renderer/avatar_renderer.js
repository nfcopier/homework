export default function (
    Renderer
) {

return function AvatarRenderer(playerState, color) {

    const transform = playerState.transform;

    const self = Renderer( transform );

    self.render = function() {
        const specs = calculateSpecs();
        self.graphics.drawRectangle( specs.wings );
        self.graphics.drawRectangle( specs.engines );
        self.graphics.drawRectangle( specs.fuselage );
        self.graphics.drawRectangle( specs.tail );
    };

    const calculateSpecs = function () {
        return {
            wings: calculateWingSpec(),
            engines: calculateEngineSpec(),
            fuselage: calculateFuselageSpec(),
            tail: calculateTailSpec()
        }
    };

    const calculateWingSpec = function () {
        return {
            color      : "white",
            upperLeft  : {
                x: 0,
                y: 5 * transform.height / 8
            },
            bottomRight: {
                x: transform.width,
                y: transform.height / 8
            }
        };
    };

    const calculateEngineSpec = function () {
        return {
            color      : color,
            upperLeft  : {
                x: transform.width / 4,
                y: 3 * transform.height / 8
            },
            bottomRight: {
                x: transform.width / 2,
                y: transform.height / 2
            }
        };
    };

    const calculateFuselageSpec = function () {
        return {
            color      : "white",
            upperLeft  : {
                x: 3 * transform.width / 8,
                y: 0
            },
            bottomRight: {
                x: transform.width / 4,
                y: transform.height
            }
        };
    };

    const calculateTailSpec = function () {
        return {
            color      : color,
            upperLeft  : {
                x: 7 * transform.width / 16,
                y: 11 * transform.height / 16
            },
            bottomRight: {
                x: transform.width / 8,
                y: transform.height / 4
            }
        };
    };

    return self;

}

}
