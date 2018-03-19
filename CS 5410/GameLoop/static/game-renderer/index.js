import headerRenderer from "./header-renderer.js"
import contentRenderer from "./content-renderer/index.js"
import footerRenderer from "./footer-renderer.js"

import gameRenderer from "./game-renderer.js"

export default function ($) {

    const HeaderRenderer = headerRenderer( $ );

    const ContentRenderer = contentRenderer( $ );

    const FooterRenderer = footerRenderer( $ );

    return gameRenderer(
        HeaderRenderer,
        ContentRenderer,
        FooterRenderer,
        $
    );

}
;