export default function(
    Renderer
) {
    const PADDING = 5;
    const BULLET_PADDING = 2;
    const BULLET_OFFSET = 67;
    const AMMO_HEIGHT = 50;
    const AMMO_WIDTH = 300;
    const MAX_MISSILES = 4;
    const MISSILE_WIDTH = 5;
    const MISSILE_HEIGHT = 35;
    const MAX_BULLETS = 200;
    const BULLET_WIDTH = 2;
    const BULLET_HEIGHT = 5;
    const BULLETS_PER_ROW = 50;

    return function AmmoRenderer(playerState, gameTransform) {

        const transform = {
            x     : (gameTransform.width - AMMO_WIDTH) / 2,
            y     : gameTransform.height - AMMO_HEIGHT,
            theta : 0,
            width : 2 * AMMO_WIDTH,
            height: AMMO_HEIGHT
        };

        const self = Renderer(transform);

        self.render = function() {
            renderMissiles();
            renderBullets();
        };

        const renderMissiles = function() {
            for (let i = 0; i < MAX_MISSILES; i++) {
                const spec = {
                    upperLeft  : {
                        x: i * (MISSILE_WIDTH + PADDING),
                        y: 0
                    },
                    bottomRight: {
                        x: MISSILE_WIDTH,
                        y: MISSILE_HEIGHT
                    },
                    color      : i < playerState.missileAmmo ? "red" : "grey",
                    alpha      : 0.7
                };
                self.graphics.drawRectangle(spec);
            }
        };

        const renderBullets = function() {
            for (let i = 0; i < MAX_BULLETS; i++) {
                const row = Math.floor(i / BULLETS_PER_ROW);
                const column = i % BULLETS_PER_ROW;
                const spec = {
                    upperLeft  : {
                        x: column * (BULLET_WIDTH + BULLET_PADDING) + BULLET_OFFSET,
                        y: row * (BULLET_HEIGHT + PADDING)
                    },
                    bottomRight: {
                        x: BULLET_WIDTH,
                        y: BULLET_HEIGHT
                    },
                    color      : i < playerState.bulletAmmo ? "yellow" : "grey",
                    alpha      : 0.7
                };
                self.graphics.drawRectangle(spec);
            }
        };

        return self;

    };

}
