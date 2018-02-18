export default function () {

    function PlayerRenderer(context, width, height) {
        this._context = context;
        this._center = {
            x: width/2,
            y: height/2
        };
        this._radius = width < height ? width/4 : height/4;
    }

    PlayerRenderer.prototype.render = function () {
        this._context.beginPath();
        this._context.arc(this._center.x, this._center.y, this._radius, 0, 2*Math.PI);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = "blue";
        this._context.arc(this._center.x, this._center.y, this._radius-5, 0, 2*Math.PI);
        this._context.fill();
        this._context.fillStyle = "black";
    };

    return PlayerRenderer;

}