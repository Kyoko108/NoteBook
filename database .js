
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const uri='mongodb+srv://simran:5Huyrd_qQeCvWTY@cluster0.3mhmh.mongodb.net/?retryWrites=true&w=majority';
dotenv.config();
const connectToMongo = async () => {
  try {
    const conn = await mongoose.connect(uri, {
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
