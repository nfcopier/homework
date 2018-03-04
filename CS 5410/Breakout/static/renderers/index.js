import renderer from "./renderer.js"
import menuRenderer from "./menu_renderer/index.js"

export default function () {

    const Renderer = renderer();

    const MenuRenderer = menuRenderer(
        Renderer
    );

    return {
        MenuRenderer: MenuRenderer
    };

}
