export default function(
    Renderer
) {

    const MAP_WIDTH = 200;
    const MAP_RIGHT = 10;
    const MAP_BOTTOM = 50;
    const BORDER_THICKNESS = 5;

    return function(gameTransform, bubbleData, playerState, buildingData, extents) {

        const gameScale = MAP_WIDTH / extents.width;

        const mapHeight = extents.height / extents.width * MAP_WIDTH;

        const transform = {
            x     : gameTransform.width - MAP_WIDTH - MAP_RIGHT - BORDER_THICKNESS * 2,
            y     : gameTransform.height - mapHeight - MAP_BOTTOM - BORDER_THICKNESS * 2,
            theta : 0,
            width : MAP_WIDTH + BORDER_THICKNESS * 2,
            height: mapHeight + BORDER_THICKNESS * 2
        };

        const self = Renderer(transform);

        const borderSpec = {
            upperLeft  : {x: 0, y: 0},
            bottomRight: {x: transform.width, y: transform.height},
            color      : "blue",
            alpha      : 0.7
        };

        const backgroundSpec = {
            upperLeft  : {x: BORDER_THICKNESS, y: BORDER_THICKNESS},
            bottomRight: {x: MAP_WIDTH, y: mapHeight},
            color      : "black",
            alpha      : 0.7
        };

        const bubbleSpec = {
            center   : {
                x: (bubbleData.x + extents.width / 2) * gameScale,
                y: (bubbleData.y + extents.height / 2) * gameScale
            },
            radius   : bubbleData.radius * gameScale,
            color    : "blue",
            thickness: 1,
            alpha    : 1
        };

        const avatarSpec = {
            center: {
                x: (playerState.x + extents.width / 2) * gameScale,
                y: (playerState.y + extents.height / 2) * gameScale
            },
            radius: 5,
            color : "green",
            alpha : 1
        };

        self.render = function() {
            self.graphics.drawRectangle(borderSpec);
            self.graphics.drawRectangle(backgroundSpec);
            self.graphics.drawCircle(avatarSpec);
            self.graphics.strokeCircle(bubbleSpec);
        };

        return self;

    };

}
