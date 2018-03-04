import graphics from "./graphics.js"
import renderer from "./renderer.js"
import menuRenderer from "./menu_renderer/index.js"

export default function () {

    const Graphics = graphics();

    const Renderer = renderer(
        Graphics
    );

    const MenuRenderer = menuRenderer(
        Renderer
    );

    return {
        MenuRenderer: MenuRenderer
    };

}
