export default function(
    Renderer
) {

    const MISSILE_WIDTH = 2;
    const MISSILE_HEIGHT = 8;
    const BULLET_WIDTH = 2;
    const BULLET_HEIGHT = 4;
    const BULLET_PADDING = 1;
    const PLUS_THICKNESS = 4;
    const PLUS_LENGTH = 12;

    return function PowerUpRenderer(powerUp) {

        const self = Renderer(powerUp.transform);

        const backgroundSpec = {
            upperLeft  : {x: 0, y: 0},
            bottomRight: {
                x: powerUp.transform.width,
                y: powerUp.transform.height
            },
            color      : "grey",
            alpha      : 1
        };

        self.render = function() {
            switch (powerUp.type) {
                case "missile":
                    return renderMissile();
                case "bullets":
                    return renderBullets();
                case"health":
                    return renderHealth();
            }
        };

        const renderMissile = function() {
            self.graphics.drawRectangle(backgroundSpec);
            const missileSpec = {
                upperLeft  : {
                    x: (powerUp.transform.width - MISSILE_WIDTH) / 2,
                    y: (powerUp.transform.height - MISSILE_HEIGHT) / 2
                },
                bottomRight: {
                    x: MISSILE_WIDTH,
                    y: MISSILE_HEIGHT
                },
                color      : "red",
                alpha      : 1
            };
            self.graphics.drawRectangle(missileSpec);
        };

        const renderBullets = function() {
            self.graphics.drawRectangle(backgroundSpec);
            const bulletSpec = {
                upperLeft  : {
                    x: (powerUp.transform.width - BULLET_WIDTH * 4 - BULLET_PADDING * 3) / 2,
                    y: (powerUp.transform.height - BULLET_HEIGHT) / 2
                },
                bottomRight: {
                    x: BULLET_WIDTH,
                    y: BULLET_HEIGHT
                },
                color      : "yellow",
                alpha      : 1
            };
            for (let i = 0; i < 4; i++) {
                self.graphics.drawRectangle(bulletSpec);
                bulletSpec.upperLeft.x += BULLET_WIDTH + BULLET_PADDING;
            }
        };

        const renderHealth = function() {
            backgroundSpec.color = "white";
            self.graphics.drawRectangle(backgroundSpec);
            const plusSpecTall = {
                upperLeft  : {
                    x: (powerUp.transform.width - PLUS_THICKNESS) / 2,
                    y: (powerUp.transform.height - PLUS_LENGTH) / 2
                },
                bottomRight: {
                    x: PLUS_THICKNESS,
                    y: PLUS_LENGTH
                },
                color      : "red",
                alpha      : 1
            };
            const plusSpecWide = {
                upperLeft  : {
                    x: (powerUp.transform.width - PLUS_LENGTH) / 2,
                    y: (powerUp.transform.height - PLUS_THICKNESS) / 2
                },
                bottomRight: {
                    x: PLUS_LENGTH,
                    y: PLUS_THICKNESS
                },
                color      : "red",
                alpha      : 1
            };
            self.graphics.drawRectangle(plusSpecTall);
            self.graphics.drawRectangle(plusSpecWide);
        };

        return self;

    };

}
