import menu from "./menu.js"
import menuSimulation from "./menu_simulation.js"

export default function (
    ScoreRepo,
    Actions
) {

    const Menu = menu();

    return menuSimulation(
        ScoreRepo,
        Actions,
        Menu
    );

}
