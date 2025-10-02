const fs = require("fs");
const path = require("path");
const { BASE_URL } = require("./server");

const baseDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Jokes API",
    description: "Une API REST pour gérer des blagues Carambar",
    contact: {
      name: "Julien Lemarchand",
      url: "https://github.com/lemarJul",
    },
  },
};

function makeSwaggerOptions(version) {
  return {
    definition: {
      ...baseDefinition,
      info: {
        ...baseDefinition.info,
        version, // injecte la version
      },
      servers: [
        {
          url: `${BASE_URL}/api/${version}`,
          description: process.env.NODE_ENV === "production" 
            ? `Serveur de production (${version})` 
            : `Serveur de dev (${version})`,
        },
      ],
    },
    apis: [
      path.join(__dirname, `./src/routers/${version}/*.js`),
      path.join(__dirname, "./src/models/*.js"),
      path.join(__dirname, "./src/controllers/*.js"),
    ],
  };
}

function exportOpenAPISpec() {
  const outputPath = path.join(__dirname, "docs", "swagger.yaml");
  const yaml = require("js-yaml");
  fs.writeFileSync(outputPath, yaml.dump(swaggerSpec), "utf-8");

  console.log(`Swagger spec exported to ${outputPath}`);
}

module.exports = {
  makeSwaggerOptions,
  exportOpenAPISpec,
};
