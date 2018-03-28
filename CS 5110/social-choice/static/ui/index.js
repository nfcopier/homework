import table      from "./table.js"
import tab        from "./tab.js"
import votesTab   from "./votes_tab/index.js"
import graphTab   from "./graph_tab/index.js"
import resultsTab from "./results_tab/index.js"
import tabs       from "./tabs.js"

export default function (
    libraries
) {

    const Table = table(
        libraries.backbone.View,
        libraries.$
    );

    const Tab = tab(
        libraries.$,
        libraries.backbone.View
    );

    const VotesTab = votesTab(
        libraries.backbone.View,
        Table,
        Tab
    );

    const GraphTab = graphTab(
        Tab
    );

    const ResultsTab = resultsTab(
        Tab
    );

    return tabs(
        VotesTab,
        GraphTab,
        ResultsTab,
        libraries.$,
        libraries.backbone.View
    );

}
