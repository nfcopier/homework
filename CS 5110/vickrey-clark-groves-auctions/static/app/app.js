export default function (
    vickreyClarkGroves,
    Slots,
    Bidders
) {

    return function App() {

        const self = {};

        const slots = Slots();
        const bidders = Bidders();

        self.results = function() {
            const bids = bidders.toArray().reduce( toBids, [] );
            const winners = vickreyClarkGroves( bids );
            return winners.map(toResult);
        };

        const toBids = function(currentBids, bidder) {
            const bidsForBidder = Array.from( bidsFor( bidder ) );
            currentBids.push( ...bidsForBidder );
            return currentBids;
        };

        const bidsFor = function*(bidder) {
            for (let slot of slots)
                yield {
                    bidder: bidder.id,
                    items: new Set([slot.id]),
                    value: bidder.valuePerClick * slot.clicks
                };

        };

        const toResult = function(winner) {
            return {
                name: bidders.byId(winner.bidder).name,
                slot: winner.items.values().next().value,
                costPerWeek: winner.cost
            }
        };

        self.slots = () => slots;
        self.bidders = () => bidders;

        self.start = function () { };

        return self;

    }

}
