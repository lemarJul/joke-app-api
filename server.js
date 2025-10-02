//Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Set default values for environment variables if not set
const port = process.env.PORT || 3000;

// Determine base URL based on environment
// Render.com automatically provides RENDER_EXTERNAL_URL in production
const BASE_URL = process.env.RENDER_EXTERNAL_URL || 
                 process.env.BASE_URL || 
                 `http://localhost:${port}`;
const { connectDB } = require("./src/db");
connectDB();

const app = new (require("./app"))();

app.listen(port, () =>
  console.log(`Listening on port ${port}, url: ${BASE_URL}/api/v1`)
);

module.exports = { app, BASE_URL };
