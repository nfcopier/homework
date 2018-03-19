export default function () {

    function EntranceRenderer(context, width, height) {
        this._context = context;
        this._width = width;
        this._height = height/4;
    }

    EntranceRenderer.prototype.render = function () {
        this._context.beginPath();
        this._context.lineTo(this._width, 0);
        this._context.lineTo(this._width/2, this._height);
        this._context.lineTo(0, 0);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = "green";
        this._context.lineTo(this._width, 0);
        this._context.lineTo(this._width/2, this._height-5);
        this._context.lineTo(0, 0);
        this._context.fill();
        this._context.fillStyle = "black";
    };

    return EntranceRenderer;

}