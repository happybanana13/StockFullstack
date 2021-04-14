const mongoose = require("mongoose");

const connectDB = () =>
  mongoose.connect(
    "mongodb://localhost:27017/StockDB",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
      if (!error) {
        console.log("Success");
      } else {
        console.log("Error connecting to db");
      }
    }
  );

const Stock = require("./models/stock.model");
module.exports = connectDB;
