import votesTab   from "./votes_tab/index.js"
import graphTab   from "./graph_tab/index.js"
import resultsTab from "./results_tab/index.js"
import tabs       from "./tabs.js"

export default function (
    libraries
) {

    const VotesTab = votesTab(
        libraries.$,
        libraries.backbone.View
    );

    const GraphTab = graphTab(
        libraries.$,
        libraries.backbone.View
    );

    const ResultsTab = resultsTab(
        libraries.$,
        libraries.backbone.View
    );

    return tabs(
        VotesTab,
        GraphTab,
        ResultsTab,
        libraries.$,
        libraries.backbone.View
    );

}
