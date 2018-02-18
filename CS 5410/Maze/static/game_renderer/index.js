import wallRenderer     from "./wall_renderer.js"
import playerRenderer   from "./player_renderer.js"
import cellRenderer     from "./cell_renderer.js"
import gameRenderer     from "./game-renderer.js"

export default function (Walls) {

    const WallRenderer = wallRenderer(
        Walls
    );

    const PlayerRenderer = playerRenderer();

    const CellRenderer = cellRenderer(
        WallRenderer,
        PlayerRenderer
    );

    return gameRenderer(
        CellRenderer
    );
}