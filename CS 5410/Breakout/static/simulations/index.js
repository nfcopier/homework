import menu from "./menu.js"
import menuSimulation from "./menu_simulation.js"
import gameSimulation from "./game_simulation/index.js"

export default function (
    Difficulties,
    Actions
) {

    const Menu = menu();

    const MenuSimulation = menuSimulation(
        Actions,
        Difficulties,
        Menu
    );

    const GameSimulation = gameSimulation(
        Difficulties,
        Actions
    );

    return {
        MenuSimulation: MenuSimulation,
        GameSimulation: GameSimulation
    };

}
