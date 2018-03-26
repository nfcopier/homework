export default function (
    $,
    View
) {

const LABEL_TEXT = "Votes";
const HIDDEN_CLASS = "is-hidden";
const SELECTED_CLASS = "is-active";

return function InputTab(input) {

    const self = new View();

    const _triggerSelect = function (e) {
        e.preventDefault();
        self.trigger("select", self);
    };

    const anchor = $("<a>").text(LABEL_TEXT);
    self.label = $("<li>").html(anchor);

    self.render = function() {
        anchor.click(_triggerSelect);
        self.unselect();
        return self;
    };

    self.select = function() {
        self.label.addClass(SELECTED_CLASS);
        self.$el.removeClass(HIDDEN_CLASS);
    };

    self.unselect = function() {
        self.label.removeClass(SELECTED_CLASS);
        self.$el.addClass(HIDDEN_CLASS);
    };

    return self;

}

}