const boundingBoxDetector = require("./bounding_box_detector.js");
const continuousCollisionDetector = require("./continuous_collision_detector");

module.exports = function (
) {

    const BoundingBoxDetector = boundingBoxDetector();
    const ContinuousCollisionDetector = continuousCollisionDetector(
        BoundingBoxDetector
    );

    return {
        BoundingBoxDetector: BoundingBoxDetector,
        ContinuousCollisionDetector: ContinuousCollisionDetector
    };

};
