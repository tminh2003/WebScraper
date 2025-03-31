const sqlite3 = require("sqlite3").verbose();
const Trie = require("../Trie.js");
const { DB_PATH } = require("../../config.js");

// Function to load product names into the Trie
function loadTrieFromDb() {
  return new Promise((resolve, reject) => {
    // Initialize the Trie
    const trie = new Trie();

    // Open the database connection
    const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(" Error opening database:", err.message);
        return reject(err);
      }
      console.log(" Connected to the database.");
    });

    // Query to retrieve all product names from the database
    const query = `SELECT Product_Name FROM products`;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(" Error retrieving data:", err.message);
        db.close();
        return reject(err);
      }

      // Insert each product name into the Trie
      rows.forEach((row) => {
        if (row.Product_Name) {
          trie.insert(row.Product_Name.toLowerCase()); // Insert product name in lowercase
        }
      });

      console.log(" All product names inserted into the Trie.");

      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error(" Error closing database:", err.message);
          return reject(err);
        }
        console.log(" Database connection closed.");
        resolve(trie); // Resolve with the populated Trie
      });
    });
  });
}

// Export the function for external use
module.exports = loadTrieFromDb;
