const { Joke } = require("../db");
const { Sequelize } = require("sequelize");

async function getAllJokes(req, res) {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json({
      success: true,
      data: jokes,
      count: jokes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jokes",
      error: error.message,
    });
  }
}

async function getJokeById(req, res) {
  try {
    const { id } = req.params;
    const joke = await Joke.findByPk(parseInt(id));

    if (!joke) {
      return res.status(404).json({
        success: false,
        message: "Joke not found",
      });
    }

    res.status(200).json({
      success: true,
      data: joke,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching joke",
      error: error.message,
    });
  }
}

async function getRandomJoke(req, res) {
  try {
    const joke = await Joke.findOne({ order: Sequelize.literal("RANDOM()") });

    if (!joke) {
      return res.status(404).json({
        success: false,
        message: "No joke found",
      });
    }

    res.status(200).json({
      success: true,
      data: joke,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching random joke",
      error: error.message,
    });
  }
}

async function createJoke(req, res) {
  try {
    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
      return res.status(400).json({
        success: false,
        message: "Setup and punchline are required",
      });
    }

    // Sanitize inputs
    const sanitizeInput = (input) => {
      const sanitized = input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .trim()
        .replace(/[<>]/g, "");
      console.log("Sanitized input:", sanitized);
      return sanitized;
    };

    const sanitized = {
      setup: sanitizeInput(setup),
      punchline: sanitizeInput(punchline),
    };

    // Check if inputs are empty after sanitization
    if (!sanitized.setup || !sanitized.punchline) {
      return res.status(400).json({
        success: false,
        message:
          "Setup and punchline cannot be empty or contain only dangerous characters",
      });
    }

    const newJoke = await Joke.create({
      setup: sanitized.setup,
      punchline: sanitized.punchline,
    });

    res.status(201).json({
      success: true,
      data: newJoke,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating joke",
      error: error.message,
    });
  }
}

module.exports = {
  getAllJokes,
  getJokeById,
  getRandomJoke,
  createJoke,
};
