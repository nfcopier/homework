export default function (
    $,
    View
) {

const LABEL_TEXT = "Votes";
const HIDDEN_CLASS = "is-hidden";
const SELECTED_CLASS = "is-active";

return function InputTab(input) {

    const self = new View();

    const _triggerSelect = function () {
        self.trigger("select");
    };

    const anchor = $("<a>").text(LABEL_TEXT);
    self.listenTo(anchor, "click", _triggerSelect);
    self.label = $("<li>").html(anchor);

    self.render = function() {
        self.unselect();
        return self;
    };

    self.unselect = function() {
        self.label.removeClass(SELECTED_CLASS);
        self.$el.addClass(HIDDEN_CLASS);
    };

    return self;

}

}