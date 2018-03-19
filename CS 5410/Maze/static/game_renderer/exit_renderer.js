export default function () {

    function EntranceRenderer(context, width, height) {
        this._context = context;
        this._width = width;
        this._top = 3*height/4;
        this._bottom = height;
    }

    EntranceRenderer.prototype.render = function () {
        this._context.beginPath();
        this._context.moveTo(0, this._bottom);
        this._context.lineTo(this._width, this._bottom);
        this._context.lineTo(this._width/2, this._top);
        this._context.lineTo(0, this._bottom);
        this._context.fill();
        this._context.beginPath();
        this._context.fillStyle = "red";
        this._context.moveTo(0, this._bottom);
        this._context.lineTo(this._width, this._bottom);
        this._context.lineTo(this._width/2, this._top+5);
        this._context.lineTo(0, this._bottom);
        this._context.fill();
        this._context.fillStyle = "black";
    };

    return EntranceRenderer;

}