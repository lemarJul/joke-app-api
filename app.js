//node_modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const V1Router = require("./src/routers/v1/index.js");

module.exports = class App extends express {
  constructor() {
    super();
    this.use(cors())
      .use(bodyParser.urlencoded({ extended: false }))
      .use(bodyParser.json())
      .use(logger(process.env.NODE_ENV === "production" ? "combined" : "dev"))
      // API routes
      .use("/api/v1", V1Router)
      //invalid path handler
      .use((req, res, next) => {
        res.status(404).json({ message: "Route not found" });
      });
  }
};
