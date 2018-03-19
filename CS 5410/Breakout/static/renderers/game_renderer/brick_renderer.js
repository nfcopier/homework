export default function (
    Renderer
) {

let cachedImage = null;
const image = new Image();
image.src = "./static/images/brick_overlay.png";
image.onload = function () {
    cachedImage = image;
};

return function (color, brick) {

    const transform = brick.getTransform();

    const self = Renderer( transform );

    const backgroundSpec = {
        upperLeft: { x: 0, y: 0 },
        bottomRight: { x: transform.width, y: transform.height },
        color: color,
        alpha: 0.5
    };

    const overlaySpec = {
        x: 0,
        y: 0,
        width: transform.width,
        height: transform.height,
        image: cachedImage
    };

    self.render = function () {
        self.graphics.drawRectangle( backgroundSpec );
        if (cachedImage)
            self.graphics.drawImage( overlaySpec );
    };

    return self;

}

}
