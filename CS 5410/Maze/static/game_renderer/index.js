import wallRenderer     from "./wall_renderer.js"
import playerRenderer   from "./player_renderer.js"
import entranceRenderer from "./entrance_renderer.js"
import exitRenderer     from "./exit_renderer.js"
import cellRenderer     from "./cell_renderer.js"
import gameRenderer     from "./game-renderer.js"

export default function (Walls) {

    const WallRenderer = wallRenderer(
        Walls
    );

    const PlayerRenderer = playerRenderer();

    const EntranceRenderer = entranceRenderer();

    const ExitRenderer = exitRenderer();

    const CellRenderer = cellRenderer(
        WallRenderer,
        PlayerRenderer,
        EntranceRenderer,
        ExitRenderer
    );

    return gameRenderer(
        CellRenderer
    );
}