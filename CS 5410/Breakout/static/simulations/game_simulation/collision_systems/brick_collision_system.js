export default function (
    CollisionDetector
) {

const ROW_POINT_VALUE = 25;

return function (ball, rowGroup) {

    const self = {};

    let brokenBrickCount = 0;
    let clearedRowCount = 0;
    let localBallTransform = toLocalCoords( ball.transform, rowGroup.transform );

    self.run = function () {
        const noCollision = !collidedWithGroup();
        if (noCollision) return;
        for (let row of rowGroup.getRows()) {
            doRowCollision( row );
        }
    };

    const collidedWithGroup = function () {
        return collided( ball.transform, rowGroup.transform );
    };

    const doRowCollision = function (row) {
        const noCollision = !collidedWithRow( row );
        if (noCollision) return;
        for (let brick of row.getBricks()) {
            doBrickCollision( row, brick );
        }
        if (!row.hasBricks()) clearedRowCount += 1;
    };

    const collidedWithRow = function (row) {
        return (
            row.hasBricks() &&
            collided( localBallTransform, row.transform )
        );
    };

    const doBrickCollision = function (row, brick) {
        const ballTransform =
            toLocalCoords( localBallTransform, row.transform );
        const noCollision = !collidedWithBrick( ballTransform, brick );
        if (noCollision) return;
        doReflection( ballTransform, brick );
        row.removeBrick( brick );
        brokenBrickCount += 1;
    };

    const collidedWithBrick = function (ballTransform, brick) {
        return collided( ballTransform, brick.transform );
    };

    function toLocalCoords (sourceTransform, targetTransform) {
        return {
            x: sourceTransform.x - targetTransform.x,
            y: sourceTransform.y - targetTransform.y,
            theta: sourceTransform.theta - targetTransform.theta,
            width: sourceTransform.width,
            height: sourceTransform.height
        }
    }

    const collided = function (transform1, transform2) {
        const detector = CollisionDetector( transform1, transform2 );
        return detector.collisionOccurred();
    };

    const doReflection = function( ballTransform, brick ) {
        const ballCenter = getCenterOf( ballTransform );
        const brickCenter = getCenterOf( brick.transform );
        if (ballCenter.x < brick.transform.x)
            doLeftCollision( ballTransform, brick.transform );
        else if (ballCenter.x > brick.transform.x + brick.transform.width)
            doRightCollision( ballTransform, brick.transform );
        else if (ballCenter.y < brickCenter.y)
            doTopCollision( ballTransform, brick.transform );
        else
            doBottomCollision( ballTransform, brick.transform );
    };

    const getCenterOf = function (transform) {
        return {
            x: transform.x + transform.width / 2,
            y: transform.y + transform.height / 2
        };
    };

    const doLeftCollision = function (ballTransform, brickTransform) {
        const xDiff = brickTransform.x - ballTransform.x - ballTransform.width;
        ball.adjustX(xDiff);
    };

    const doRightCollision = function (ballTransform, brickTransform) {
        const xDiff = brickTransform.x + brickTransform.width - ballTransform.x;
        ball.adjustX(xDiff);
    };

    const doTopCollision = function (ballTransform, brickTransform) {
        const yDiff = brickTransform.y - ballTransform.y - ballTransform.height;
        ball.adjustY(yDiff);
    };

    const doBottomCollision = function (ballTransform, brickTransform) {
        const yDiff = brickTransform.height + brickTransform.y - ballTransform.y;
        ball.adjustY(yDiff);
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
