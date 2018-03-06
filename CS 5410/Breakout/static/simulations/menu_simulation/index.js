import menu from "./menu.js"
import menuSimulation from "./menu_simulation.js"

export default function (
    ScoreRepo,
    Actions,
    Difficulties
) {

    const Menu = menu();

    return menuSimulation(
        ScoreRepo,
        Actions,
        Difficulties,
        Menu
    );

}
