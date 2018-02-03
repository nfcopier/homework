import tickerRenderer from "./ticker-renderer.js"
import addTickRenderer from "./add-tick-renderer.js"

import contentRenderer from "./content-renderer.js"

export default function ($) {

    const TickerRenderer = tickerRenderer( $ );
    const AddTickRenderer = addTickRenderer( $ );

    return contentRenderer(
        TickerRenderer,
        AddTickRenderer,
        $
    );

}