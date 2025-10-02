//Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// Project modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Todo: Database connection
const { connectDB } = require("./src/db");
connectDB();

// Initialize Express app
const app = express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors());

// Initialize Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Jokes API!");
});

app.listen(port, () =>
  console.log(`Listening on port ${port}, url: ${baseUrl}`)
);

module.exports = app;
