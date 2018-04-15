import table      from "./table.js"
import tab        from "./tab.js"
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

    return tabs(
        libraries.$,
        libraries.backbone.View
    );

}
