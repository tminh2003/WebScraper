const path = require("path");

// Define constants
const PROJECT_ROOT = path.resolve(__dirname, "");
const DB_PATH = path.join(PROJECT_ROOT, "database", "price_comparison.db");
const CSV_PATH = path.join(PROJECT_ROOT, "database", "mock_data50.csv");
const PORT = 3000;
const API_KEY = "your-api-key";

// Export constants
module.exports = {
  PROJECT_ROOT,
  DB_PATH,
  CSV_PATH,
  PORT,
  API_KEY,
};
