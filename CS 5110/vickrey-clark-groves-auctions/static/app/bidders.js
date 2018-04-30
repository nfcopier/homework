export default function (
    names
) {

return function Bidders() {

    const self = {};

    let bidders = [];

    self[Symbol.iterator] = function* () {
        yield* bidders;
    };

    self.add = function (valuePerClick) {
        const newBidder = bidderGenerator.next().value;
        newBidder.valuePerClick = valuePerClick;
        bidders.push( newBidder );
    };

    const bidderGenerator = function* () {
        for (let i = 0; true; i++)
            yield { id: i, name: names.random() }
    }();

    self.remove = function(victim) {
        bidders = bidders.filter( b => b.id !== victim.id );
    };

    self.toArray = () => Array.from( self );

    self.byId = (id) => bidders.find( b => b.id === id);

    return self;

}

}
