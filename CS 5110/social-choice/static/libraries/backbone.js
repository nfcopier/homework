export default function(
    parent
) {

    const View = function () {
        return new parent.View(arguments);
    };

    const Collection = function () {
        return new parent.Collection(arguments);
    };

    return {
        View: View,
        Collection: Collection
    };

}