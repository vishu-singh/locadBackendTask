const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    isEnabled: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },

}, { timestamps: true, collection: "products" });

const Products = mongoose.model("products", productSchema);
module.exports = Products;