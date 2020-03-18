
const mongoose = require('mongoose');

//list of food available.
const DonatedFoodSchema = new mongoose.Schema({
  category: String, //food stype: staple, vegetable, fruits, seafood, meat, cereal, 
  name: String,
  measurement: String, //enum, takes values: "weight","volume","pieces"
  quantity: Number,
  use_by: Date,
  donor_org: String, //organisation who donated

}, { timestamps: true });

const DonatedFood = mongoose.model('DonatedFood', DonatedFoodSchema);

module.exports = DonatedFood;
