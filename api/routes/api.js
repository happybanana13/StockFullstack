const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const StockModel = mongoose.model("Stock");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.post("/", jsonParser, (req, res) => {
  console.log(req.body);
  var Stock = new StockModel();
  Stock.name = req.body.name;
  Stock.symbol = req.body.symbol;
  Stock.currency = req.body.currency;
  Stock.stockExchange = req.body.stockExchange;
  Stock.save();
  res.send("OK");
});

router.get("/db", (req, res) => {
  StockModel.find((err, docs) => {
    if (!err) {
      console.log(docs);
      res.send({ data: docs });
    }
  });
});

router.delete("/db", jsonParser, (req, res) => {
  StockModel.findOneAndDelete(
    { symbol: req.body.symbol },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted User : ", docs);
      }
    }
  );
  res.send("deleted company");
});

module.exports = router;
