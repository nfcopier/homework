export default function (
    CollisionDetector
) {

return function (ball, rowGroup) {

    const self = {};

    let collisionOccurred = false;

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
    };

    const collidedWithRow = function (row) {
        return collided( localBallTransform, row.transform );
    };

    const doBrickCollision = function (row, brick) {
        const noCollision = !collidedWithBrick( row, brick );
        if (noCollision) return;
        row.removeBrick( brick );
        collisionOccurred = true;
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

    self.collisionOccurred = function () { return collisionOccurred; };

    return self;

}

}
