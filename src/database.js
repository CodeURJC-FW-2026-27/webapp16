const mongoose = require('mongoose');

const defaultMongoUri = 'mongodb://127.0.0.1:27017/bullandpear';

async function connectDatabase(uri = process.env.MONGODB_URI || defaultMongoUri) {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}

module.exports = { connectDatabase };
