export default function (
    Renderer
) {

let overlayImage = null;

const fetchImage = function () {
    const glassImage = new Image();
    glassImage.src = "./static/images/brick_overlay - Copy.png";
    glassImage.onload = function () {
        overlayImage = glassImage;
    };
};

fetchImage();

return function BuildingRenderer(building) {

    const self = Renderer( building.transform );

    const baseSpec = {
        upperLeft: { x: 0, y: 0},
        bottomRight: {
            x: building.transform.width,
            y: building.transform.height,
        },
        color: building.color
    };

    const imageSpec = Object.assign({
        image: overlayImage,
        alpha: 0.5
    }, baseSpec);

    self.render = function () {
        renderFloor();
    };

    const renderFloor = function () {
        self.graphics.drawRectangle( baseSpec );
        self.graphics.drawImage( imageSpec );
    };

    return self;

}

}
