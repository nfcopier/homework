import inputTab from "./input_tab/index.js"
import tabs from "./tabs.js"

export default function (
    backbone,
    $
) {

    const InputTab = inputTab(
        $,
        backbone.View
    );

    return tabs(
        InputTab,
        {},
        {},
        $,
        backbone.View
    );

}
