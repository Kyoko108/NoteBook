
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config();
const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit();
  }
};

module.exports = connectToMongo;
