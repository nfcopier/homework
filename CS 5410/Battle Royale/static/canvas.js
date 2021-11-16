export default function() {

    return function Canvas() {

        const self = {};

        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 768;
        const context = canvas.getContext("2d");
        let renderer = null;

        self.el = function() {
            return canvas;
        };

        self.getScale = function() {
            return {
                x: canvas.width / canvas.clientWidth,
                y: canvas.height / canvas.clientHeight
            };
        };

        self.setRenderer = function(newRenderer) {
            renderer = newRenderer;
        };

        self.render = function(elapsedTime) {
            clearCanvas();
            renderer._render(context, elapsedTime);
        };

        const clearCanvas = function() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };

        self.camera = () => renderer.camera();

        return self;

    };

}
