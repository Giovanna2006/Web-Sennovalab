const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sennovalab');

const objetoBD = mongoose.connection;

objetoBD.on('connected', () => {
  console.log('Conexión correcta a MongoDB');
});

objetoBD.on('error', () => {
  console.log('Error en la conexión a MongoDB');
});

module.exports = mongoose;