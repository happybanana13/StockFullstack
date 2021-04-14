const express = require("express"),
  app = express();
const connectDB = require("./DB/connection");

app.use("/api", require("./routes/api"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
