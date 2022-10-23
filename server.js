const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
// Init Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => res.send("API running"));

// Define Routes
app.use("/api/AnneOfGreenGables", require("./routes/api/AnneOfGreenGables"));
app.use("/api/Sapiens", require("./routes/api/Sapiens"));

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
