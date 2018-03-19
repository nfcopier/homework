import brickCollisionSystem from "./brick_collision_system.js"
import collisionDetector from "./collision_detector.js"

export default function (
) {

    const CollisionDetector = collisionDetector();

    const BrickSystem = brickCollisionSystem(
        CollisionDetector
    );

    return {
        BrickSystem: BrickSystem
    };

}
