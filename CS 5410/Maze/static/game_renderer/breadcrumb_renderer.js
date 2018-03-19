export default function (
    Directions
) {

    function BreadcrumbRenderer(context, breadcrumbs, width, heigth) {
        this._context = context;
        this._breadcrumbs = breadcrumbs;
        this._width = width;
        this._height = heigth;
    }

    BreadcrumbRenderer.prototype.render = function () {
        this._context.translate(this._width / 2, this._height / 2);
        if (this._breadcrumbs & Directions.TOP)
            this._renderCrumb();
        this._context.rotate(Math.PI/2);
        if (this._breadcrumbs & Directions.RIGHT)
            this._renderCrumb();
        this._context.rotate(Math.PI/2);
        if (this._breadcrumbs & Directions.BOTTOM)
            this._renderCrumb();
        this._context.rotate(Math.PI/2);
        if (this._breadcrumbs & Directions.LEFT)
            this._renderCrumb();
        this._context.rotate(Math.PI/2);
        this._context.translate(-this._width / 2, -this._height / 2);
    };

    BreadcrumbRenderer.prototype._renderCrumb = function () {
        const left = 0;
        const center = Math.floor(0.125*this._width);
        const right = Math.floor(0.25*this._width);
        const top = 0;
        const bottom = Math.floor(0.125*this._height);
        this._context.translate(-0.125*this._width, -0.375*this._height);
        this._context.beginPath();
        this._context.fillStyle = "purple";
        this._context.moveTo(left, bottom);
        this._context.lineTo(center, top);
        this._context.lineTo(right, bottom);
        this._context.lineTo(left, bottom);
        this._context.fill();
        // this._context.beginPath();
        // this._context.fillStyle = "grey";
        // this._context.moveTo(0, 0.125*this._height);
        // this._context.lineTo(0, 0.375*this._height-3);
        // this._context.lineTo(-0.125*this.width+1, -0.25*this._height+1);
        // this._context.lineTo(0.125*this._width-1, 0.25*this._height-1);
        // this._context.fill();
        this._context.fillStyle = "black";
        this._context.translate(0.125*this._width, 0.375*this._height);
    };

    return BreadcrumbRenderer;

}