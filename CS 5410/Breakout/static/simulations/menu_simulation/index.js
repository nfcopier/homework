import menu from "./menu.js"
import menuSimulation from "./menu_simulation.js"

export default function (
    ScoreRepo,
    DifficultyRepo,
    Actions,
    Difficulties
) {

    const Menu = menu();

    return menuSimulation(
        ScoreRepo,
        DifficultyRepo,
        Actions,
        Difficulties,
        Menu
    );

}
