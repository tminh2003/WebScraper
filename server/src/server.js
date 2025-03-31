const Trie = require("./Trie.js");
const loadCsvToDb = require("./scripts/csv-to-db.js");
const loadTrieFromDb = require("./scripts/db-to-trie.js");
const loadArrayFromDb = require("./scripts/db-to-array.js");
const { PORT } = require("../config.js");

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());

// Serve the React build folder
app.use(express.static(path.join(__dirname, "../../client/dist")));

let searchSuggest; // Will be initialized later

//Make sure database is loaded first
(async () => {
  try {
    //Convert CSV to DB (if needed)
    await loadCsvToDb();

    // Initialize searchSuggest with Trie after DB is ready
    searchSuggest = await loadTrieFromDb();

    // Initialize productsArray after DB is ready
    //productsArray = await loadArrayFromDb();
    //console.log(productsArray);

    console.log("Database and Trie are ready.");

    // Start the server only after setup is complete
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error("Error during server setup:", err);
    process.exit(1);
  }
})();

// Suggestions route
app.get("/suggestions", (req, res) => {
  if (!searchSuggest) {
    return res.status(500).json({ error: "Trie not initialized yet" });
  }

  const query = req.query.query;

  // Get suggestions from Trie
  const suggestions = searchSuggest.getSuggestions(query.toLowerCase(), 5);

  res.json({
    suggestions,
  });
});

// Catch-all route to serve index.html
app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});
