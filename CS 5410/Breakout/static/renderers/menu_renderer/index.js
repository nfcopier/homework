import buttonRenderer from "./button_renderer.js"
import scoreRenderer from "./score_renderer.js"
import menuRenderer from "./menu_renderer.js"

export default function (Renderer) {

    const ButtonRenderer = buttonRenderer(
        Renderer
    );

    const ScoreRenderer = scoreRenderer(
        Renderer
    );

    return menuRenderer(
        ButtonRenderer,
        ScoreRenderer,
        Renderer
    )

}
