const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FruitsSchema = new Schema({
  name: String,
  price: String,
});

module.exports = FruitsSchema;
