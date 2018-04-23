export default function () {

return function Graphics(context) {

    const self = {};

    const addAlpha = function (alpha) {
        const red = "0x" + context.fillStyle.slice(1,3);
        const green = "0x" + context.fillStyle.slice(3,5);
        const blue = "0x" + context.fillStyle.slice(5,7);
        context.fillStyle = `rgba(${+red},${+green},${+blue},${alpha})`;
    };

    self.clearCursor = function () {
        self.setCursor("default")
    };

    self.setCursor= function (cursor) {
        context.canvas.style.cursor = cursor;
    };

    self.drawRectangle = function (spec) {
        context.fillStyle = spec.color;
        if (spec.alpha) addAlpha( spec.alpha );
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
        context.fillStyle = spec.color;
        context.fillText(
            spec.text,
            spec.location.x,
            spec.location.y
        );
        if (!spec.border) return;
        context.strokeStyle = spec.border.color;
        context.lineWidth = spec.border.thickness;
        context.strokeText(
            spec.text,
            spec.location.x,
            spec.location.y
        );
    };

    self.drawImage = function (spec) {
        if (spec.alpha) context.globalAlpha = spec.alpha;
        context.drawImage(
            spec.image,
            spec.upperLeft.x,
            spec.upperLeft.y,
            spec.bottomRight.x,
            spec.bottomRight.y
        );
        context.globalAlpha = 1;
    };

    self.drawCircle = function({center, radius, color, alpha}) {
        if (alpha) context.globalAlpha = alpha;
        context.fillStyle = color;
        context.beginPath();
        context.arc(
            center.x,
            center.y,
            radius,
            0,
            2*Math.PI
        );
        context.fill();
        context.globalAlpha = 0.5;
    };

    self.drawLine = function(spec) {};

    self.clip = function (points) {
        tracePath( points );
        context.clip()
    };

    self.drawPath = function ({points, color, alpha, thickness}) {
        if (alpha) context.globalAlpha = alpha;
        context.lineWidth = thickness;
        context.strokeStyle = color;
        tracePath( points );
        context.stroke();
        context.globalAlpha = 0.5;
        context.lineWidth = 1;
    };

    const tracePath = function ([firstPoint, ...tailPoints]) {
        context.beginPath();
        context.moveTo( firstPoint.x, firstPoint.y );
        for (let point of tailPoints)
            context.lineTo( point.x, point.y )
        context.closePath();
    };

    return self;

}

}
