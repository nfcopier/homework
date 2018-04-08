import gameObject from "./game_object.js"
import square from "./square.js"
import squareFactory from "./square_factory.js"
import obstacles from "./obstacles.js"
import snake from "./snake.js"

export default function (
    Difficulties,
    Directions
) {

    const GameObject = gameObject();

    const Square = square( GameObject );

    const SquareFactory = squareFactory( Square );

    const Obstacles = obstacles(
        Square
    );

    const Snake = snake(
        Directions
    );

    return {
        GameObject: GameObject,
        SquareFactory: SquareFactory,
        Obstacles: Obstacles,
        Snake: Snake
    }
}
