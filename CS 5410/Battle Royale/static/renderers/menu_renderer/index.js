import buttonRenderer  from "./button_renderer.js";
import creditsRenderer from "./credits_renderer.js";
import menuRenderer    from "./menu_renderer.js";
import scoresRenderer  from "./scores_renderer.js";
import textRenderer    from "./text_field_renderer.js";

export default function(Renderer) {

    const ButtonRenderer = buttonRenderer(
        Renderer
    );

    const TextFieldRenderer = textRenderer(
        Renderer
    );

    const ScoresRenderer = scoresRenderer(
        Renderer
    );

    const CreditsRenderer = creditsRenderer(
        Renderer
    );

    return menuRenderer(
        ButtonRenderer,
        TextFieldRenderer,
        ScoresRenderer,
        CreditsRenderer,
        Renderer
    );

}
