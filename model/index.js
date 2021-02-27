const FruitsSchema = require('./Fruits');
const AuthSchema = require('./Auth');
const connection = require('./connection');

const Fruits = connection.model('Fruits', FruitsSchema);
const Auth = connection.model('Auth', AuthSchema);

module.exports = {
  Fruits,
  Auth,
};
