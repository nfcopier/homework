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
        const noCollision = !collidedWithBrick( row, brick );
        if (noCollision) return;
        row.removeBrick( brick );
        brokenBrickCount += 1;
    };

    const collidedWithBrick = function (row, brick) {
        const ballTransform =
            toLocalCoords( localBallTransform, row.transform );
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

    self.scoreCollisions = function () {
        const brickPoints = brokenBrickCount * rowGroup.getPointValue();
        const rowPoints = clearedRowCount * ROW_POINT_VALUE;
        return brickPoints + rowPoints;
    };

    self.getBrokenBricks = function () { return brokenBrickCount; };

    return self;

}

}
