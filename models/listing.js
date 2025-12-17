const mongoose = require('mongoose');
const schema = mongoose.Schema;

const listingschema = new schema({
    title: { type: String, require: true },
    description: { type: String },
    image: {
        type: {
            filename: String,
            url: String
        },
        default: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        }
    },
    price: Number,
    location: String,
    country: String
})

const listing = mongoose.model('listing', listingschema)
module.exports = listing;