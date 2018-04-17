import slotsTable from "./slots_table.js"
import biddersTable from "./bidders_table.js"
import biddersTab from "./bidders_tab.js"

export default function (
    View,
    Table,
    Tab
) {

    const SlotsTable = slotsTable(
        Table,
        View
    );

    const BiddersTable = biddersTable(
        Table,
        View
    );

    return biddersTab(
        SlotsTable,
        BiddersTable,
        Tab
    )

}
