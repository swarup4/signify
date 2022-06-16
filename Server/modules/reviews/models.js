const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const reviews = {
    _id: { type: objectId, auto: true },
    review: String,
    author: String,
    review_source: String,
    rating: Number,
    title: String,
    product_name: String,
    reviewed_date: Date
};
const userSchema = new Schema(reviews, { versionKey: false });

module.exports = mongoose.model("review", userSchema);