export default function (
    $,
    View
) {

const HIDDEN_CLASS = "is-hidden";
const SELECTED_CLASS = "is-active";

return function Tab(label) {

    const self = View();

    const _triggerSelect = function (e) {
        e.preventDefault();
        self.trigger( "select", self );
    };

    const anchor = $("<a>").text( label );
    self.label = $("<li>").html( anchor );

    self.render = function() {
        anchor.click(_triggerSelect);
        return self;
    };

    self.select = function() {
        self.label.addClass( SELECTED_CLASS );
        self.$el.removeClass( HIDDEN_CLASS );
    };

    self.unselect = function() {
        self.label.removeClass( SELECTED_CLASS );
        self.$el.addClass( HIDDEN_CLASS );
    };

    return self;

}

}