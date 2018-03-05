import menu from "./menu.js"
import menuSimulation from "./menu_simulation.js"
import gameSimulation from "./game_simulation/index.js"

export default function (Actions) {

    const Menu = menu();

    const MenuSimulation = menuSimulation(
        Actions,
        Menu
    );

    const GameSimulation = gameSimulation(
        Actions
    );

    return {
        MenuSimulation: MenuSimulation,
        GameSimulation: GameSimulation
    };

}
