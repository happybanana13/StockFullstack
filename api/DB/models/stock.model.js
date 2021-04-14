const mongoose = require("mongoose");

var StockSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  symbol: {
    type: String,
  },
  currency: {
    type: String,
  },
  stockExchange: {
    type: String,
  },
});

mongoose.model("Stock", StockSchema);
