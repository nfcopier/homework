export default function (
    CollisionDetector
) {

const ROW_POINT_VALUE = 25;

return function (ball, game) {

    const self = {};

    const ballCenter = getCenterOf( ball.transform );
    let brokenBricks = [];
    let clearedRowCount = 0;

    self.run = function () {
        for (let group of game.getChildren()) {
            doGroupCollision( group );
        }
    };

    const doGroupCollision = function (group) {
        const noCollision = !collidedWithGroup( group );
        if (noCollision) return;
        const brickCount = { points: group.getPointValue(), count: 0 };
        brokenBricks.push( brickCount );
        for (let row of group.getChildren()) {
            doRowCollision( row, brickCount );
        }
        if (!group.hasChildren()) group.destroy();
    };

    const collidedWithGroup = function (group) {
        const groupTransform = group.toAncestorCoords( game );
        return collided( ball.transform, groupTransform );
    };

    const doRowCollision = function (row, brickCount) {
        const noCollision = !collidedWithRow( row );
        if (noCollision) return;
        for (let brick of row.getChildren()) {
            doBrickCollision( brick, brickCount );
        }
        if (row.hasChildren()) return;
        clearedRowCount += 1;
        row.destroy()
    };

    const collidedWithRow = function (row) {
        const rowTransform = row.toAncestorCoords( game );
        return collided( ball.transform, rowTransform );
    };

    const doBrickCollision = function (brick, brickCount) {
        const brickTransform = brick.toAncestorCoords( game );
        const noCollision = !collided( ball.transform, brickTransform );
        if (noCollision) return;
        doReflection( brickTransform );
        brick.destroy();
        brickCount.count += 1;
    };

    const collided = function (transform1, transform2) {
        const detector = CollisionDetector( transform1, transform2 );
        return detector.collisionOccurred();
    };

    const doReflection = function( brickTransform ) {
        const brickCenter = getCenterOf( brickTransform );
        if (ballCenter.x < brickTransform.x)
            doLeftCollision( brickTransform );
        else if (ballCenter.x > brickTransform.x + brickTransform.width)
            doRightCollision( brickTransform );
        else if (ballCenter.y < brickCenter.y)
            doTopCollision( brickTransform );
        else
            doBottomCollision( brickTransform );
    };

    function getCenterOf(transform) {
        return {
            x: transform.x + transform.width / 2,
            y: transform.y + transform.height / 2
        };
    }

    const doLeftCollision = function (brickTransform) {
        const xDiff = brickTransform.x-ball.transform.x-ball.transform.width;
        ball.adjustX( xDiff );
    };

    const doRightCollision = function (brickTransform) {
        const xDiff = brickTransform.x+brickTransform.width-ball.transform.x;
        ball.adjustX( xDiff );
    };

    const doTopCollision = function (brickTransform) {
        const yDiff = brickTransform.y-ball.transform.y-ball.transform.height;
        ball.adjustY( yDiff );
    };

    const doBottomCollision = function (brickTransform) {
        const yDiff = brickTransform.height+brickTransform.y-ball.transform.y;
        ball.adjustY( yDiff );
    };

    self.scoreCollisions = function () {
        return scoreBricks() + scoreRows();
    };

    const scoreBricks = function () {
        let points = 0;
        for (let bricks of brokenBricks) {
            points += bricks.points * bricks.count;
        }
        return points;
    };

    const scoreRows = function () {
        return clearedRowCount * ROW_POINT_VALUE;
    };

    self.getBrokenBricks = function () {
        let count = 0;
        for (let bricks of brokenBricks) {
            count += bricks.count;
        }
        return count;
    };

    return self;

}

}
