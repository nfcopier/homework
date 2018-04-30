import vickreyClarkGroves from "./vickrey-clark-groves.js"
import utils from "./utils/index.js"
import slots from "./slots.js"
import bidders from "./bidders.js"
import app from "./app.js"

export default function (
    libraries
) {

    const v = vickreyClarkGroves();

    const Bidders = bidders(
        utils.names
    );

    const Slots = slots();

    return app(
        v,
        Slots,
        Bidders
    );

}
