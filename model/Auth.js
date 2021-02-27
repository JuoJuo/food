const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  username: String,
  password: String,
});

module.exports = AuthSchema;
