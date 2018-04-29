import graphics from "./graphics.js"
import renderer from "./renderer.js"
import menuRenderer from "./menu_renderer/index.js"
import gameRenderer from "./game_renderer/index.js"

export default function () {

    const Graphics = graphics();

    const Renderer = renderer(
        Graphics
    );

    const MenuRenderer = menuRenderer(
        Renderer
    );

    const GameRenderer = gameRenderer(
        Renderer
    );

    return {
        MenuRenderer: MenuRenderer,
        GameRenderer: GameRenderer
    };

}
