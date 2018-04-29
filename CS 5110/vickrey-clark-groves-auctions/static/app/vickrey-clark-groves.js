export default function () {

    function paymentsFrom(winningBids, bids) {
        const applySocialCost = applySocialCostOf(winningBids, bids);
        return winningBids.bids.map( applySocialCost );
    }

    function applySocialCostOf(winningBids, allBids) {
        return (bidInQuestion) => {
            const socialCost =
                      socialCostFrom( bidInQuestion, winningBids, allBids );
            return paymentFrom( bidInQuestion, socialCost )
        }}

    function paymentFrom(bidInQuestion, socialCost) {
        return {
            bidder: bidInQuestion.bidder,
            items : bidInQuestion.items,
            cost  : socialCost
        };
    }

    function socialCostFrom(bidInQuestion, winningBids, allBids) {
        const otherBids = allBids.filter(not(hasSameBidderAs(bidInQuestion)));
        const otherValue = winningBidsFrom(otherBids).value;
        return otherValue + bidInQuestion.value - winningBids.value;
    }

    function winningBidsFrom(bids) {
        if (!bids.length) return {bids: [], value: 0};
        const [bidInQuestion, ...others] = bids;
        const remainderWinners =
                  winningBidsFrom( differenceOf(others, bidInQuestion) );
        const thisWinners = concat( bidInQuestion, remainderWinners );
        const otherWinners = winningBidsFrom( others );
        return maxBid( thisWinners, otherWinners );
    }

    function differenceOf(others, bidInQuestion) {
        return others
            .filter(not(hasSameBidderAs(bidInQuestion)))
            .filter(not(overlaps(bidInQuestion)));
    }

    function not(predicate) {
        return (value) => !predicate(value);
    }

    function hasSameBidderAs(firstBid) {
        return (secondBid) => firstBid.bidder === secondBid.bidder;
    }

    function overlaps(firstBid) {
        return (secondBid) => {
            if (firstBid.bidder === secondBid.bidder)
                return true;
            for (let item of firstBid.items) {
                if (secondBid.items.has(item))
                    return true;
            }
            return false;
        }
    }

    function concat(single, remainder) {
        return {
            bids: [single, ...remainder.bids],
            value: single.value + remainder.value
        }
    }

    function maxBid(left, right) {
        return left.value > right.value ? left : right;
    }

    return function vickreyClarkGroves(bids) {
        const winningBids = winningBidsFrom( bids );
        return paymentsFrom( winningBids, bids );
    };

}
