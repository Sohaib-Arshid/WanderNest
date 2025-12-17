const mongoose = require('mongoose');
const initdata = require('./data');
const listing = require('../models/listing.js')

mongoose.connect('mongodb://127.0.0.1:27017/wonderland')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


const initdataDB = async () => {
    await listing.deleteMany({});
    await listing.insertMany(initdata.data)
    console.log('data are list ona DB');
}

initdataDB();