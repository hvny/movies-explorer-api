const {
  DB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3001,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

module.exports = {
  DB_ADRESS,
  PORT,
  JWT_SECRET,
  NODE_ENV,
};
