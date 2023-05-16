const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    cost: { type: Number, required: true },
});

const contentSchema = new mongoose.Schema({
    item_id: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const scheduleSchema = new mongoose.Schema({
    days_of_week: { type: [Number], required: true },
    dates_of_month: { type: [Number], required: true },
    months_of_year: { type: [Number], required: true },
});

const offerSchema = new mongoose.Schema({
    offer_id: { type: String, required: true },
    offer_title: { type: String, required: true },
    offer_description: { type: String, required: true },
    offer_image: { type: String, required: true },
    offer_sort_order: { type: Number, required: true },
    content: { type: [contentSchema], required: true },
    schedule: { type: scheduleSchema, required: true },
    target: { type: String, required: true },
    pricing: { type: [pricingSchema], required: true },
});

module.exports = mongoose.model('Offer', offerSchema);