import scoreRepo from "./score_repository.js"
import menu from "./menu.js"
import menuSimulation from "./menu_simulation.js"
import gameSimulation from "./game_simulation/index.js"

export default function (
    Difficulties,
    Actions
) {

    const ScoreRepo = scoreRepo();

    const Menu = menu();

    const MenuSimulation = menuSimulation(
        ScoreRepo,
        Actions,
        Difficulties,
        Menu
    );

    const GameSimulation = gameSimulation(
        ScoreRepo,
        Difficulties,
        Actions
    );

    return {
        MenuSimulation: MenuSimulation,
        GameSimulation: GameSimulation
    };

}
