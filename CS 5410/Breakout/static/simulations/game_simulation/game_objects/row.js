export default function (
    GameObject
) {

const BRICK_HEIGHT = 25;
const BRICK_GAP = 5;
const BRICK_COUNT = 16;

return function Row(rowY, groupWidth) {

    const transform = {
        x: 0,
        y: rowY,
        theta: 0,
        width: groupWidth,
        height: BRICK_HEIGHT
    };

    const self = GameObject( transform );

    const brickWidth = transform.width / BRICK_COUNT - BRICK_GAP;

    const brickTransformTemplate = {
        x: BRICK_GAP / 2,
        y: 0,
        theta: 0,
        width: brickWidth,
        height: BRICK_HEIGHT
    };

    const initialize = function () {
        createBricks();
    };

    const createBricks = function () {
        for (let i = 0; i < BRICK_COUNT; i++) {
            self.addChild( createBrick() );
        }
    };

    const createBrick = function () {
        const transform = Object.assign( {}, brickTransformTemplate );
        brickTransformTemplate.x += BRICK_GAP + brickWidth;
        return GameObject( transform );
    };

    initialize();

    return self;

}

}
