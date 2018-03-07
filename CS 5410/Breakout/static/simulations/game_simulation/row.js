export default function () {

const BRICK_HEIGHT = 25;
const BRICK_GAP = 5;
const BRICK_COUNT = 16;

return function Row(rowY, groupWidth) {

    const self = {};

    self.transform = {
        x: 0,
        y: rowY,
        theta: 0,
        width: groupWidth,
        height: BRICK_HEIGHT
    };

    const brickWidth = self.transform.width / BRICK_COUNT - BRICK_GAP;

    const brickTransformTemplate = {
        x: BRICK_GAP / 2,
        y: 0,
        theta: 0,
        width: brickWidth,
        height: BRICK_HEIGHT
    };

    const bricks = createBricks();

    function createBricks() {
        const results = [];
        for (let i = 0; i < BRICK_COUNT; i++) {
            results.push( createBrick() );
        }
        return results;
    }

    function createBrick() {
        const transform = Object.assign( {}, brickTransformTemplate );
        brickTransformTemplate.x += BRICK_GAP + brickWidth;
        return {transform: transform};
    }

    self.hasBricks = function () { return bricks.length > 0; };

    self.getBricks = function () { return bricks; };

    self.removeBrick = function (victim) {
        const index = bricks.indexOf( victim );
        bricks.splice( index, 1 );
    };

    return self;

}

}
