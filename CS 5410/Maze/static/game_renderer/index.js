import wallRenderer         from "./wall_renderer.js"
import playerRenderer       from "./player_renderer.js"
import entranceRenderer     from "./entrance_renderer.js"
import exitRenderer         from "./exit_renderer.js"
import breadcrumbRenderer  from "./breadcrumb_renderer.js"
import cellRenderer         from "./cell_renderer.js"
import gameRenderer         from "./game-renderer.js"

export default function (
    Directions,
    Actions
) {

    const WallRenderer = wallRenderer(
        Directions
    );

    const PlayerRenderer = playerRenderer();

    const EntranceRenderer = entranceRenderer();

    const ExitRenderer = exitRenderer();

    const BreadCrumbRenderer = breadcrumbRenderer(
        Directions
    );

    const CellRenderer = cellRenderer(
        WallRenderer,
        PlayerRenderer,
        EntranceRenderer,
        ExitRenderer,
        BreadCrumbRenderer
    );

    return gameRenderer(
        CellRenderer,
        Actions
    );
}