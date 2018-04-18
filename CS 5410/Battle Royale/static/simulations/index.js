import menuSimulation from "./menu_simulation/index.js"
import gameSimulation from "./game_simulation/index.js"

export default function (
    Actions
) {

    const MenuSimulation = menuSimulation(
        Actions
    );

    const GameSimulation = gameSimulation(
        Actions
    );

    return {
        MenuSimulation: MenuSimulation,
        GameSimulation: GameSimulation
    };

}
