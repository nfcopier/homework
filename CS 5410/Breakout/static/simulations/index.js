import menuSimulation from "./menu_simulation.js"

export default function (Actions) {

    const MenuSimulation = menuSimulation(
        Actions
    );

    return {
        MenuSimulation: MenuSimulation
    };

}
