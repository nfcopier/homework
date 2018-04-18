export default function (
    GameObject
) {

return function Avatar(location) {

    const transform = {
        x: location.x,
        y: location.y,
        theta: 0,
        width: 20,
        height: 25
    };

    const center = {
        x: transform.x + transform.width / 2,
        y: transform.y + transform.height / 2
};

    let hp = 20;

    const self = GameObject( transform );

    self.damage = function(value) {
        hp -= value
    };

    self.rotate = function(mouseLocation) {
        const vector = {
            y: center.x - mouseLocation.x,
            x: center.y - mouseLocation.y
        };
        let theta = Math.atan( vector.y / vector.x );
        if (vector.x < 0) theta += Math.PI;
        transform.theta = theta;
    };

    return self;

}

}
