export default function(
    parent
) {

    const View = function (options = {}) {
        if (options.className) {
            if (!options.attributes) options.attributes = {};
            options.attributes.class = options.className;
        }
        return new parent.View(options);
    };

    const Collection = function () {
        return new parent.Collection(arguments);
    };

    return {
        View: View,
        Collection: Collection
    };

}