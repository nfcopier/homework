export default function (
    Renderer
) {

const HEALTH_WIDTH = 240;
const HEALTH_HEIGHT = 20;
const BORDER_THICKNESS = 5;
const FULL_HEALTH = 20;

return function HealthRenderer(playerState, gameTransform) {

    const transform = {
        x: ( gameTransform.width - HEALTH_WIDTH ) / 2,
        y: 10,
        theta: 0,
        width: HEALTH_WIDTH,
        height: HEALTH_HEIGHT
    };

    const healthSpec = {
        upperLeft: {
            x: BORDER_THICKNESS,
            y: BORDER_THICKNESS
        },
        bottomRight: {
            x: HEALTH_WIDTH * playerState.health / FULL_HEALTH,
            y: HEALTH_HEIGHT
        },
        color: colorFromState(),
        alpha: 0.7
    };

    function colorFromState() {
        if (playerState.health < FULL_HEALTH / 4)
            return "red";
        if (playerState.health < FULL_HEALTH / 2)
            return "yellow";
        return "green";
    }

    const borderSpec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: {
            x: transform.width + BORDER_THICKNESS * 2,
            y: transform.height + BORDER_THICKNESS * 2
        },
        color: "blue",
        alpha: 0.7
    };

    const self = Renderer( transform );

    self.render = function () {
        self.graphics.drawRectangle( borderSpec );
        self.graphics.drawRectangle( healthSpec );
     };

    return self;
}

}
