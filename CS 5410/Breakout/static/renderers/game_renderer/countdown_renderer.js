export default function (Renderer) {

return function CountdownRenderer(countdown) {

    const transform = countdown.transform;

    const self = Renderer( transform );

    self.render = function () {
        const spec = createSpec();
        self.graphics.drawText( spec );
    };

    const createSpec = function () {
        const number = Math.ceil( countdown.value / 1000 );
        const size = calculateSize();
        return {
            text: `${number}`,
            font: `${size}px serif`,
            color: "blue",
            location: {x: transform.width / 2, y: transform.height / 2},
            alignment: "center",
            border: { color: "magenta", thickness: 2 }
        }
    };

    const calculateSize = function () {
        const mod = (countdown.value-1) % 1000;
        const remainder = 1000 - mod;
        if (remainder > 300) return 96;
        return Math.ceil(remainder * 96 / 300);
    };

    return self;

}

}
