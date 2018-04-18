export default function (
    GameObject
) {

const MAX_SPEED = 5;

return function Avatar(location) {

    const transform = {
        x: location.x,
        y: location.y,
        theta: 0,
        width: 20,
        height: 25
    };

    const center = function() { return {
        x: transform.x + transform.width / 2,
        y: transform.y + transform.height / 2
    } };

    let hp = 20;

    const self = GameObject( transform );

    self.damage = function(value) {
        hp -= value
    };

    self.move = function(vector) {
        if (vector.x === 0 && vector.y === 0) return;
        const newVector = unitize( rotate( transform.theta, vector ) );
        transform.x += MAX_SPEED * newVector.x;
        transform.y -= MAX_SPEED * newVector.y;
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
    };

    return self;

}

}
