const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://sam:85526620@cluster0.egjns.mongodb.net/fruits';

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const conn = mongoose.createConnection(mongoUrl, mongoConfig);

conn.on('open',()=>{
  console.log('connect success!');
});

conn.on('error',(error)=>{
    console.log(error);
});

module.exports = conn;
