import scoreRepo from "./score_repository.js"
import difficultyRepo from "./difficulty_repository.js"
import menuSimulation from "./menu_simulation/index.js"
import gameSimulation from "./game_simulation/index.js"

export default function (
    Difficulties,
    Actions
) {

    const ScoreRepo = scoreRepo();

    const DifficultyRepo = difficultyRepo(
        Difficulties
    );

    const MenuSimulation = menuSimulation(
        ScoreRepo,
        DifficultyRepo,
        Actions,
        Difficulties
    );

    const GameSimulation = gameSimulation(
        ScoreRepo,
        DifficultyRepo,
        Difficulties,
        Actions
    );

    return {
        MenuSimulation: MenuSimulation,
        GameSimulation: GameSimulation
    };

}
