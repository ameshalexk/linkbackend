const mongoose = require('mongoose');
// const geoCoder = require('../utils/geocoder');

const Place1Schema = new mongoose.Schema({
  address: {
    type: String,
    required: [true, 'Please add an address'],
  },
});

// Before saving, convert address to geoCode
// PlaceSchema.pre('save', async function(next) {
//     const loc = await geoCoder.geocode(this.address);
//     this.location = {
//         type: 'Point',
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         city: loc[0].city,
//         formattedAddress: loc[0].formattedAddress
//     };

//     // Do not save address
//     this.address = undefined;
//     next();
// });

module.exports = mongoose.model('Place1', Place1Schema);
