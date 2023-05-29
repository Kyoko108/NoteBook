const dotenv = require("dotenv"); 
const mongoose = require("mongoose");
dotenv.config();
const MONGO_URL = process.env.MONGO_URL; 
const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL); // connecting to database
    console.log(`MongoDB Connected: ${conn.connection.host} `); // if connected
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit();
  }
};

module.exports = connectToMongo;// exporting the function
