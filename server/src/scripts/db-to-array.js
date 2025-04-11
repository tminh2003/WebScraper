const { DB_PATH } = require("../../config");

const sqlite3 = require("sqlite3").verbose();

function loadArrayFromDb() {
  return new Promise((resolve, reject) => {
    // Open the database file
    let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to the products database.");
      }
    });

    // Query to retrieve all products
    let sql = `SELECT * FROM products`;

    let products = [];

    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err.message);
        return reject(err); // Properly reject the promise on error
      }

      // Load all rows into the products array
      const start = process.hrtime(); // Start time measurement
      products = rows.map((row) => ({
        id: row.Product_ID,
        name: row.Product_Name,
        type: row.Product_Type,
        amazonPrice: row.Amazon_Price,
        color: row.Product_Color,
        material: row.Product_Material,
        ebayPrice: row.eBay_Price,
        amazonURL: row.Amazon_URL,
        ebayURL: row.eBay_URL,
        timestamp: row.Timestamp,
      }));
      const diff = process.hrtime(start);
      const timeInMs = diff[0] * 1000 + diff[1] / 1e6;
      console.log(`Time taken to insert to array: ${timeInMs.toFixed(3)} ms`);

      // Resolve the promise with the populated products array
      resolve(products);
    });

    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error("Error closing the database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
    });
  });
}
module.exports = loadArrayFromDb;
