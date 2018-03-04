export default function () {

return function Canvas() {

    self = {};

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 768;
    const context = canvas.getContext("2d");
    let renderer = null;

    self.el = function() {
        return canvas;
    };

    self.setRenderer = function (newRenderer) {
        renderer = newRenderer;
    };

    self.render = function() {
        clearCanvas();
        renderer._render( context );
    };

    const clearCanvas = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return self;

};

}
