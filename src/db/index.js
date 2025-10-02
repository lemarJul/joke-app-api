const Sequelize = require("sequelize");
const dbInstance = require("./database.config");
const path = require("path");

// Define models immediately so they're available when modules are imported
require("../models/joke.model")(dbInstance, Sequelize.DataTypes);

const seedersMap = new Map().set(dbInstance.models.Joke, "jokes.seed.json");
/**
 * Establishes a connection to the database and initializes the application's data layer.
 *
 * This function performs the following operations:
 * 1. Ensures only one database connection instance exists (singleton pattern)
 * 2. Registers the Joke model with Sequelize
 * 3. Authenticates the database connection
 * 4. Synchronizes all models with the database (using alter: true to update schema)
 * 5. Seeds the database with initial data if empty
 * 6. Tests the database connection
 *
 * @returns {Promise<Sequelize>} The Sequelize instance representing the database connection
 * @throws {Error} If unable to connect to the database, the original error is logged and re-thrown
 */
async function connectDB() {
  try {
    await dbInstance.authenticate();
    console.log("Connection has been established successfully.");

    await dbInstance.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    // Seed all models that need seeding
    for (const [Model, seederFileName] of seedersMap) {
      await seedDB(Model, seederFileName);
    }
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    throw err;
  }
  return dbInstance;
}

async function disconnectDB() {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
    console.log("Database connection closed.");
  }
}

async function seedDB(Model, seederFileName) {
  if ((await Model.count()) === 0) {
    const seedPath = path.join(__dirname, "..", "seeds", seederFileName);
    const seedData = require(seedPath);

    await Model.bulkCreate(seedData);
    console.log(`${Model.name} seeded with initial data.`);
  } else {
    console.log(
      `Database already contains data for ${Model.name}, skipping seeding.`
    );
  }
}

module.exports = {
  connectDB,
  disconnectDB,
  ...dbInstance.models,
};
