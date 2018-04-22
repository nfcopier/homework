export default function (
    GameObject
) {

const MAX_SPEED = 0.25;
const FOV_AREA = 768*768 / 4 * Math.tan( Math.PI / 12 );

return function Avatar(sourceTransform) {

    const transform = Object.assign( {}, sourceTransform );

    let relativeFov;

    const calculateRelativeFov = function () {
        const fovAngle = Math.PI / 6; // WIll be configurable in the future.
        const armLength = Math.sqrt( FOV_AREA / Math.tan(fovAngle) );
        const point1 = {
            x: armLength * Math.cos( -fovAngle ),
            y: armLength * Math.sin( -fovAngle )
        };
        const point2 = {
            x: armLength * Math.cos( fovAngle ),
            y: armLength * Math.sin( fovAngle )
        };
        relativeFov = { point1: point1, point2: point2 };
    };

    const center = function() { return {
        x: transform.x + transform.width / 2,
        y: transform.y + transform.height / 2
    } };

    const self = GameObject( transform );

    self.move = function(vector, timeElapsed) {
        if (vector.x === 0 && vector.y === 0) return;
        const newVector = unitize( rotate( transform.theta, vector ) );
        transform.x += MAX_SPEED * timeElapsed * newVector.x;
        transform.y -= MAX_SPEED * timeElapsed * newVector.y;
    };

    const rotate = function (theta, vector) {
        return {
            x: Math.cos( theta ) * vector.x - Math.sin( theta ) * vector.y,
            y: Math.sin( theta ) * vector.x + Math.cos( theta ) * vector.y
        };
    };

    const unitize = function (vector) {
        const mag = Math.sqrt( vector.x * vector.x + vector.y * vector.y );
        return {
            x: mag * vector.x,
            y: mag * vector.y
        };
    };

    self.rotate = function(mouseLocation) {
        const c = center();
        const vector = {
            y: c.x - mouseLocation.x,
            x: c.y - mouseLocation.y
        };
        let theta = Math.atan( vector.y / vector.x );
        if (vector.x < 0) theta += Math.PI;
        transform.theta = theta;
        calculateRelativeFov();
    };

    self.fov = function() {
        return [
            {
                x: transform.width / 2,
                y: transform.height / 2
            },
            {
                x: -relativeFov.point1.y + transform.width / 2,
                y: -relativeFov.point1.x + transform.height / 2
            },
            {
                x: -relativeFov.point2.y + transform.width / 2,
                y: -relativeFov.point2.x + transform.height / 2
            }
        ]
    };

    calculateRelativeFov();

    return self;

}

};
