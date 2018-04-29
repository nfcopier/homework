import countdownRenderer      from "./countdown_renderer.js"
import avatarRenderer         from "./avatar_renderer.js"
import playerRenderer         from "./player_renderer.js"
import buildingRenderer       from "./building_renderer.js"
import powerUpRenderer        from "./power_up_renderer.js"
import scoreRenderer          from "./score_renderer.js"
import healthRenderer         from "./health_renderer.js"
import playerCountRenderer    from "./player_count_renderer.js"
import analyticsRenderer      from "./analytics_renderer.js"
import ammoRenderer           from "./ammo_renderer.js"
import mapRenderer            from "./map_renderer.js"
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

    const BuildingRenderer = buildingRenderer(
        Renderer
    );

    const PowerUpRenderer = powerUpRenderer(
        Renderer
    );

    const ScoreRenderer = scoreRenderer(
        Renderer
    );

    const HealthRenderer = healthRenderer(
        Renderer
    );

    const PlayerCountRenderer = playerCountRenderer(
        Renderer
    );

    const AnalyticsRenderer = analyticsRenderer(
        Renderer
    );

    const AmmoRenderer = ammoRenderer(
        Renderer
    );

    const MapRenderer = mapRenderer(
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
        BuildingRenderer,
        PowerUpRenderer,
        Renderer,
        Renderer,
        ScoreRenderer,
        HealthRenderer,
        PlayerCountRenderer,
        AnalyticsRenderer,
        AmmoRenderer,
        MapRenderer,
        ParticleEffectRenderer,
        Camera,
        Renderer
    );

}
