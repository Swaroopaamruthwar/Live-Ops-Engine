const express = require('express');
const router = express.Router();
const offers = require("../models/offer");

router.get('/Offers', (req, res) => {
    const page = req.query.page || 1;
    const records = req.query.records || 100;
    const attribute = req.query.attribute || 'offer_title';
    const query = req.query.query || '';

    // Search for offers using the provided query parameters
    const filteredOffers = offers.filter(offer => offer[attribute].toLowerCase().includes(query.toLowerCase()));

    // Calculate the start and end indices of the current page
    const startIndex = (page - 1) * records;
    const endIndex = Math.min(startIndex + records, filteredOffers.length);

    // Slice the filtered offers array based on the current page
    const currentOffers = filteredOffers.slice(startIndex, endIndex);

    // Construct the response payload
    const responsePayload = {
        page: page,
        has_more: endIndex < filteredOffers.length,
        offer: currentOffers
    };

    // Send the response
    res.status(200).json(responsePayload);
});
router.put('/Offers/:offerId', async (req, res) => {
    try {
        const { offerId } = req.params;
        const offer = await offers.findOneAndUpdate({ offer_id: offerId }, req.body, { new: true });

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        return res.json({ offer });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.delete('/:offer_id', async (req, res) => {
    try {
        const offer = await offers.findOneAndDelete({ offer_id: req.params.offer_id });
        if (offer) {
            res.status(200).json({ message: 'Offer deleted successfully' });
        } else {
            res.status(404).json({ message: 'Offer not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
