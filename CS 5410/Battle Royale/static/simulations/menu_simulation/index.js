import menu           from "./menu.js";
import menuSimulation from "./menu_simulation.js";

export default function(
    Actions
) {

    const Menu = menu();

    return menuSimulation(
        Actions,
        Menu
    );

}
