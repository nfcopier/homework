import table      from "./table.js"
import tab        from "./tab.js"
import biddersTab from "./bidders_tab/index.js"
import resultsTab from "./results_tab.js"
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

    const BiddersTab = biddersTab(
        libraries.backbone.View,
        Table,
        Tab
    );

    const ResultsTab = resultsTab(
        Table,
        Tab
    );

    return tabs(
        BiddersTab,
        ResultsTab,
        libraries.$,
        libraries.backbone.View
    );

}
