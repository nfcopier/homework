export default function () {

return function Graphics(context) {

    const self = {};

    self.clearCursor = function () {
        self.setCursor("default")
    };

    self.setCursor= function (cursor) {
        context.canvas.style.cursor = cursor;
    };

    self.drawRectangle = function (spec) {
        context.fillStyle = spec.color;
        context.fillRect(
            spec.upperLeft.x,
            spec.upperLeft.y,
            spec.bottomRight.x,
            spec.bottomRight.y
        );
    };

    self.strokeRectangle = function (spec) {
        context.strokeStyle = spec.color;
        context.strokeRect(
            spec.upperLeft.x,
            spec.upperLeft.y,
            spec.bottomRight.x,
            spec.bottomRight.y
        );
    };

    self.drawText = function (spec) {
        context.textBaseline = "middle";
        context.textAlign = spec.alignment;
        context.font = spec.font;
        context.strokeStyle = spec.border.color;
        context.lineWidth = spec.border.thickness;
        context.strokeText(
            spec.text,
            spec.location.x,
            spec.location.y
        );
        context.fillStyle = spec.color;
        context.fillText(
            spec.text,
            spec.location.x,
            spec.location.y
        )
    };

    return self;

}

}
