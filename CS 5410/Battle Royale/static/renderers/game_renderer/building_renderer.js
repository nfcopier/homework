export default function (
    Renderer
) {

const WALL_THICKNESS = 10;
let overlayImage = null;

const fetchImage = function () {
    const glassImage = new Image();
    glassImage.src = "./static/images/brick_overlay - Copy.png";
    glassImage.onload = function () {
        overlayImage = glassImage;
    };
};

fetchImage();

return function BuildingRenderer(buildingSpec) {

    const self = Renderer( buildingSpec.transform );

    const backgroundSpec = {
        upperLeft: { x: 0, y: 0},
        bottomRight: {
            x: buildingSpec.transform.width,
            y: buildingSpec.transform.height,
        },
        alpha: 0.5,
        color: buildingSpec.color,
        image: overlayImage
    };
    const wallRenderSpec = {
        color: buildingSpec.color,
        radius: WALL_THICKNESS,
        alpha: 0.75
    };

    self.render = function () {
        renderFloor();
        for (let wallSpec of buildingSpec.walls)
            renderWall( wallSpec );
    };

    const renderFloor = function () {
        self.graphics.drawRectangle( backgroundSpec );
        self.graphics.drawImage(backgroundSpec );
    };

    const renderWall = function (wallSpec) {
        const end1Spec = Object.assign(
            {center: wallSpec.p1},
            wallRenderSpec
        );
        const end2Spec = Object.assign(
            {center: wallSpec.p2},
            wallRenderSpec
        );
        const lineSpec = Object.assign(
            {
                points: [ wallSpec.p1, wallSpec.p2 ],
                thickness: WALL_THICKNESS * 2
            },
            wallRenderSpec
        );
        self.graphics.drawCircle( end1Spec );
        self.graphics.drawCircle( end2Spec );
        self.graphics.drawPath( lineSpec );
    };

    return self;

}

}
