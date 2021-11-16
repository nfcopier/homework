import Actions     from "./actions.js";
import canvas      from "./canvas.js";
import Directions  from "./directions.js";
import game        from "./game.js";
import inputSystem from "./input_system.js";
import ioStream    from "./io_stream.js";
import KeyCodes    from "./key_codes.js";
import r           from "./renderers/index.js";
import s           from "./simulations/index.js";

export default function() {

    const Canvas = canvas();

    const renderers = r(
        Directions
    );

    const simulations = s(
        Actions,
        Directions
    );

    const InputSystem = inputSystem(
        KeyCodes,
        Actions,
        Directions
    );

    const IOStream = ioStream(
        window.io
    );
    delete window.io;

    const Game = game(
        Canvas,
        Actions,
        renderers,
        simulations,
        InputSystem,
        IOStream
    );

    const gameInstance = new Game();
    gameInstance.start();

}
