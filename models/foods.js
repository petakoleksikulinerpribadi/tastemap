const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name: String,
    category: String,
    rating: Number,
    notes: String,
    photo: String,
    location: {
        lat: Number,
        lng: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Food", FoodSchema);
