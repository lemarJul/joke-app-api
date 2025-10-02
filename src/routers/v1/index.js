const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { makeSwaggerOptions } = require("../../../swagger.config");

const jokesRouter = require("./jokes.router");
const swaggerSpec = swaggerJsdoc(makeSwaggerOptions("v1"));

router
  .use("/jokes", jokesRouter)
  // Documentation Swagger
  .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  .use("/openapi.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

module.exports = router;
