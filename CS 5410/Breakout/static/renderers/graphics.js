export default function () {

return function Graphics(context) {

    const self = {};

    self.drawRectangle = function (spec) {
        context.fillStyle = spec.color;
        context.fillRect(
            spec.upperLeft.x,
            spec.upperLeft.y,
            spec.bottomRight.x,
            spec.bottomRight.y
        );
    };

    self.drawText = function (spec) {
        context.textAlign = spec.alignment;
        context.font = spec.font;
        context.strokeStyle = "purple";
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
