import utils from "./utils/index.js"
import votes from "./votes.js"
import app   from "./app.js"

export default function (
    libraries
) {

    const Votes = votes(
        utils.nameList,
        utils.BinaryTree,
        libraries.backbone.Collection
    );

    return app(
        Votes
    );

}