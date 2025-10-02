//Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Set default values for environment variables if not set
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const { connectDB } = require("./src/db");
connectDB();


const app = new (require("./app"))();

app.listen(port, () =>
  console.log(`Listening on port ${port}, url: ${baseUrl}/api/v1`)
);

module.exports = app;
