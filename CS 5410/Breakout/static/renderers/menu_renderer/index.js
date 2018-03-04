import buttonRenderer from "./button_renderer.js"
import menuRenderer from "./menu_renderer.js"

export default function (Renderer) {

    const ButtonRenderer = buttonRenderer(
        Renderer
    );

    return menuRenderer(
        ButtonRenderer,
        Renderer
    )

}
