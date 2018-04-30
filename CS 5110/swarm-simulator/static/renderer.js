export default function () {

    const self = {};

    const canvas = document.querySelector( ".sim-canvas" );
    const context = canvas.getContext( "2d" );

    self.update = function (entities) {
        context.clearRect( 0, 0, canvas.width, canvas.height );
        entities.forEach( renderEntity );
    };

    const renderEntity = function ({ color, radius, x, y }) {
        context.fillStyle = color;
        context.beginPath();
        context.arc( x, y, radius, 0, 2*Math.PI );
        context.closePath();
        context.fill();
        context.strokeStyle = "black";
        context.beginPath();
        context.arc( x, y, radius, 0, 2*Math.PI );
        context.stroke();
        context.closePath();
    };

    return self;

}
