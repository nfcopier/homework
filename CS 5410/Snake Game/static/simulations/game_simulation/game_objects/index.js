import gameObject from "./game_object.js"
import square from "./square.js"
import squareFactory from "./square_factory.js"
import obstacles from "./obstacles.js"

export default function (
    Difficulties
) {

    const GameObject = gameObject();

    const Square = square( GameObject );

    const SquareFactory = squareFactory( Square );

    const Obstacles = obstacles(
        Square
    );

    return {
        GameObject: GameObject,
        SquareFactory: SquareFactory,
        Obstacles: Obstacles
    }
}
