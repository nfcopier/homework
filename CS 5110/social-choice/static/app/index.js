import utils from "./utils/index.js"
import candidates from "./candidates.js"
import votes from "./votes.js"
import results from "./results.js"
import app from "./app.js"

export default function (
    libraries
) {

    const Candidates = candidates(
        utils.names
    );

    const Votes = votes(
        utils.names,
        utils.BinaryTree,
        libraries.backbone.Collection
    );

    const Results = results();

    return app(
        Candidates,
        Votes,
        Results
    );

}