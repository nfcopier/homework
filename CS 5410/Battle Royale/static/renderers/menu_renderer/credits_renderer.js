export default function(Renderer) {

    return function(credits) {

        const self = Renderer(credits.transform);

        let currentY = 400;

        const specTemplate = {
            font     : "18px serif",
            color    : "green",
            alignment: "center",
            border   : {color: "green", thickness: 1}
        };

        self.render = function() {
            for (let creditLine of credits.list) {
                drawCreditLine(creditLine);
            }
        };

        const drawCreditLine = function(creditLine) {
            const spec = Object.assign({}, specTemplate);
            spec.text = creditLine.join(" - ");
            spec.location = {x: getX(), y: getY()};
            self.graphics.drawText(spec);
        };

        const getX = function() {
            return credits.transform.x + credits.transform.width / 2;
        };

        const getY = function() {
            const current = currentY;
            currentY += 30;
            return current;
        };

        return self;

    };

}
