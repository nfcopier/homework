export default function (
    SlotsTable,
    BiddersTable,
    Tab
) {

const LABEL_TEXT = "Bidders";

return function BiddersTab(slots, bidders) {

    const self = Tab( LABEL_TEXT );

    const slotsTable = SlotsTable( slots );
    const biddersTable = BiddersTable( bidders );

    self.render = function () {
        self.$el.empty();
        self.$el.append( slotsTable.render().el );
        self.$el.append( biddersTable.render().el );
        return self;
    };

    return self;

}

}
