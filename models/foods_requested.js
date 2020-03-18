
const mongoose = require('mongoose');

//list of food required.
const foodRequestedSchema = new mongoose.Schema({
  category: String,
  measurement: String, //enum, takes values: "weight","volume","pieces"
  quantity: Number,
  request_org: String, //organisation who request

}, { timestamps: true });


const FoodRequested = mongoose.model('FoodRequested', foodRequestedSchema);

module.exports = FoodRequested;