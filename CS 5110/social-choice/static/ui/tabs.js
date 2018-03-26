export default function (
    InputTab,
    GraphTab,
    BordaTab,
    $,
    View
) {

return function Tabs(app) {

    const self = new View();

    const barWrapper = $("<div>").addClass("tabs is-centered");
    const tabBar = $("<ul>");
    const contents = $("<div>");

    const tabs = [
        InputTab( app.input ),
        // GraphTab( app.majority ),
        // BordaTab( app.borda ),
    ];

    self.render = function () {
        self.$el.empty();
        _listenToTabs();
        _renderTabLabels();
        _renderTabContents();
        return self;
    };

    const _listenToTabs = function () {
        for (let tab of tabs)
            self.listenTo(tab, "select", _selectTab);
    };

    const _selectTab = function(tab) {
        for(let t of tabs)
            t.unselect();
        tab.select();
    };

    const _renderTabLabels = function () {
        self.$el.append(barWrapper.empty().html(tabBar.empty()));
        for (let tab of tabs)
            tabBar.append(tab.label);
    };

    const _renderTabContents = function () {
        self.$el.append(contents.empty());
        for (let tab of tabs)
            contents.append(tab.render().el);
    };

    return self;

}

}