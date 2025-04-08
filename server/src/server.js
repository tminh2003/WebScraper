const Trie = require("./Trie.js");
const loadCsvToDb = require("./scripts/csv-to-db.js");
const loadTrieFromDb = require("./scripts/db-to-trie.js");
const loadArrayFromDb = require("./scripts/db-to-array.js");
const getSimilarity = require("./scripts/similarity.js");
const { PORT } = require("../config.js");

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());

// Serve the React build folder
app.use(express.static(path.join(__dirname, "../../client/dist")));

let searchSuggest; // Will be initialized later
let productsArray;
//Make sure database is loaded first
(async () => {
  try {
    //Convert CSV to DB (if needed)
    await loadCsvToDb();

    // Initialize searchSuggest with Trie after DB is ready
    searchSuggest = await loadTrieFromDb();

    // Initialize productsArray after DB is ready
    productsArray = await loadArrayFromDb();
    console.log(productsArray);

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

app.get("/search", (req, res) => {
  //Extract query from search
  const query = req.query.query;

  //Get first suggestion from search suggest
  const suggestion = searchSuggest.getSuggestions(query.toLowerCase(), 1);
  if (!suggestion) {
    res.status(401).json({ error: "No suggestion found" });
  } else {
    console.log("Suggestion: ", suggestion);

    //Get the exact product from the products array
    let exactProduct = productsArray.find(
      (product) => product.name.toLowerCase() == suggestion
    );
    //Get three most similar products from the products array
    //Filter out the exact product from the list of similar products
    const similar = getSimilarity(productsArray, suggestion, 3).filter(
      (p) => p.name.toLowerCase() !== exactProduct.name.toLowerCase()
    );

    //Join together the exact product and the similar products
    const similarProducts = [exactProduct, ...similar];

    res.json({
      similarProducts,
    });
  }
});

// Product route
app.get("/product", (req, res) => {
  //Extract query from search
  const query = req.query.productId;

  //Get the exact product from the products array
  let exactProduct = productsArray.find(
    (product) => product.name.toLowerCase() == query.toLowerCase()
  );

  res.json({
    product: exactProduct,
  });
});

// Catch-all route to serve index.html
app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});
