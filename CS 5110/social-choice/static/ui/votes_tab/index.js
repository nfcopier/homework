import candidateTable from "./candidate_table.js"
import voterTable     from "./voter_table.js"
import votesTab       from "./votes_tab.js"

export default function (
    View,
    Table,
    Tab
) {

    const CandidateTable = candidateTable(
        View,
        Table
    );

    const VoterTable = voterTable(
        View,
        Table
    );

    return votesTab(
        CandidateTable,
        VoterTable,
        Tab
    );

}