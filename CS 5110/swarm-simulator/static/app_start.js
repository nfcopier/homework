import InputSource from "./input_source.js"
import Game        from "./game/game.js"
import Renderer    from "./renderer.js"

const SIM_WIDTH = 1024;
const SIM_HEIGHT = 768;

export default function () {

    const inputSource = InputSource( SIM_WIDTH, SIM_HEIGHT );
    const game = Game();
    const renderer = Renderer();
    let lastTime = performance.now();

    const gameLoop = function (now) {
        const elapsedTime = now - lastTime;
        const input = inputSource.input();
        game.update( input, elapsedTime );
        renderer.update( game.entities() );
        inputSource.reset();
        lastTime = now;
        requestAnimationFrame( gameLoop );
    };

    gameLoop( lastTime );

    console.log( "App started!" );

}
