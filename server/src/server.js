const Trie = require("./Trie.js");

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
console.log(__dirname);

let searchSuggest = new Trie();
searchSuggest.insert("chicken");
searchSuggest.insert("cow");

// Serve the React build folder
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("/suggestions", (req, res) => {
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

//

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
