const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    isEnabled: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, { timestamps: true, collection: "users" });

const User = mongoose.model("user", userSchema);
module.exports = User;