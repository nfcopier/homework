import countdownRenderer      from "./countdown_renderer.js"
import avatarRenderer         from "./avatar_renderer.js"
import playerRenderer         from "./player_renderer.js"
import scoreRenderer          from "./score_renderer.js"
import analyticsRenderer      from "./analytics_renderer.js"
import particleEffectRenderer from "./particle_effect_renderer.js"
import camera                 from "./camera.js"
import gameRenderer           from "./game_renderer.js"

export default function (
    Renderer
) {

    const CountdownRenderer = countdownRenderer(
        Renderer
    );

    const AvatarRenderer = avatarRenderer(
        Renderer
    );

    const PlayerRenderer = playerRenderer(
        Renderer,
        AvatarRenderer
    );

    const ScoreRenderer = scoreRenderer(
        Renderer
    );

    const AnalyticsRenderer = analyticsRenderer(
        Renderer
    );

    const ParticleEffectRenderer = particleEffectRenderer(
        Renderer
    );

    const Camera = camera();

    return gameRenderer(
        CountdownRenderer,
        AvatarRenderer,
        PlayerRenderer,
        Renderer,
        Renderer,
        ScoreRenderer,
        AnalyticsRenderer,
        ParticleEffectRenderer,
        Camera,
        Renderer
    );

}
