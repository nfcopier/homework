import scoreRepo from "./score_repository.js"
import menuSimulation from "./menu_simulation/index.js"
import gameSimulation from "./game_simulation/index.js"

export default function (
    Actions
) {

    const ScoreRepo = scoreRepo();

    const MenuSimulation = menuSimulation(
        ScoreRepo,
        Actions
    );

    const GameSimulation = gameSimulation(
        ScoreRepo,
        Actions
    );

    return {
        MenuSimulation: MenuSimulation,
        GameSimulation: GameSimulation
    };

}
