export default function (Renderer) {

let cachedImage = null;

const image = new Image();
image.src = "./static/images/steel_ball.png";
image.onload = function () {
    cachedImage = image;
};

return function (ball) {

    const transform = ball.transform;

    const spec = {
        x: 0,
        y: 0,
        width: transform.width,
        height: transform.height
    };

    const self = Renderer( transform );

    if (cachedImage) self.render = function() {
        spec.image = cachedImage;
        self.graphics.drawImage( spec );
    };

    return self;

}

}
