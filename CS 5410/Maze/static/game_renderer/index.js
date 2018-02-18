import wallRenderer     from "./wall_renderer.js"
import cellRenderer     from "./cell_renderer.js"
import gameRenderer     from "./game-renderer.js"

export default function (Walls) {

    const WallRenderer = wallRenderer(
        Walls
    );

    const CellRenderer = cellRenderer(
        WallRenderer
    );

    return gameRenderer(
        CellRenderer
    );
}