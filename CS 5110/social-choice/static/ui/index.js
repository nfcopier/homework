import inputTab from "./input_tab/index.js"
import graphTab from "./graph_tab/index.js"
import resultsTab from "./results_tab/index.js"
import tabs from "./tabs.js"

export default function (
    backbone,
    $
) {

    const InputTab = inputTab(
        $,
        backbone.View
    );

    const GraphTab = graphTab(
        $,
        backbone.View
    );

    const ResultsTab = resultsTab(
        $,
        backbone.View
    );

    return tabs(
        InputTab,
        GraphTab,
        ResultsTab,
        $,
        backbone.View
    );

}
