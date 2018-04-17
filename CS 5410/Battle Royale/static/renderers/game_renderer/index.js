import countdownRenderer      from "./countdown_renderer.js"
import scoreRenderer          from "./score_renderer.js"
import analyticsRenderer      from "./analytics_renderer.js"
import particleEffectRenderer from "./particle_effect_renderer.js"
import gameRenderer           from "./game_renderer.js"

export default function (
    Renderer
) {

    const CountdownRenderer = countdownRenderer(
        Renderer
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

    return gameRenderer(
        CountdownRenderer,
        ScoreRenderer,
        AnalyticsRenderer,
        ParticleEffectRenderer,
        Renderer
    );

}
