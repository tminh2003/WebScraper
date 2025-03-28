const Trie = require("./Trie.js");
const csvToDb = require("./scripts/csv-to-db.js");
const searchSuggest = require("./scripts/db-to-trie.js");
const { PORT } = require("../config.js");

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());

console.log(searchSuggest);

// Serve the React build folder
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("/suggestions", (req, res) => {
  const query = req.query.query;

  console.log(searchSuggest);

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
