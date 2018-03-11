export default function (
    CollisionDetector
) {

const ROW_POINT_VALUE = 25;

return function (ball, rowGroup) {

    const self = {};

    const ballCenter = getCenterOf( ball.transform );
    let brokenBrickCount = 0;
    let clearedRowCount = 0;
    const game = rowGroup.getParent();

    self.run = function () {
        const noCollision = !collidedWithGroup();
        if (noCollision) return;
        for (let row of rowGroup.getChildren()) {
            doRowCollision( row );
        }
    };

    const collidedWithGroup = function () {
        return collided( ball.transform, rowGroup.toAncestorCoords( game ) );
    };

    const doRowCollision = function (row) {
        const noCollision = !collidedWithRow( row );
        if (noCollision) return;
        for (let brick of row.getChildren()) {
            doBrickCollision( row, brick );
        }
        if (row.hasChildren()) return;
        clearedRowCount += 1;
        rowGroup.removeChild( row );
    };

    const collidedWithRow = function (row) {
        const rowTransform = row.toAncestorCoords( game );
        return collided( ball.transform, rowTransform );
    };

    const doBrickCollision = function (row, brick) {
        const brickTransform = brick.toAncestorCoords( game );
        const noCollision = !collided( ball.transform, brickTransform );
        if (noCollision) return;
        doReflection( brickTransform );
        row.removeChild( brick );
        brokenBrickCount += 1;
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
        const brickPoints = brokenBrickCount * rowGroup.getPointValue();
        const rowPoints = clearedRowCount * ROW_POINT_VALUE;
        return brickPoints + rowPoints;
    };

    self.getBrokenBricks = function () { return brokenBrickCount; };

    return self;

}

}
