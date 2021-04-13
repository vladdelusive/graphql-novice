const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const authorScheme = new Scheme({
    name: String,
    age: Number,
})

module.exports = mongoose.model("Author", authorScheme);