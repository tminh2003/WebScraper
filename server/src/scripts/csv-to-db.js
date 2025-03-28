const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");
const { DB_PATH, CSV_PATH } = require("../../config.js");

// Create the database
const db = new sqlite3.Database(DB_PATH);

// Create the products table if it doesn't exist
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS products (
            Product_ID INTEGER PRIMARY KEY,
            Product_Name TEXT,
            Product_Type TEXT,
            Amazon_Price REAL,
            eBay_Price REAL,
            Amazon_URL TEXT,
            eBay_URL TEXT,
            Timestamp TEXT
        )
    `);
});

// Read and parse the CSV file
fs.createReadStream(CSV_PATH)
  .pipe(csv())
  .on("data", (row) => {
    // Prepare the INSERT query
    const query = `
    INSERT OR REPLACE INTO products (Product_ID, Product_Name, Product_Type, Amazon_Price, eBay_Price, Amazon_URL, eBay_URL, Timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

    const values = [
      parseInt(row.Product_ID),
      row.Product_Name,
      row.Product_Type,
      parseFloat(row.Amazon_Price),
      parseFloat(row.eBay_Price),
      row.Amazon_URL,
      row.eBay_URL,
      row.Timestamp,
    ];

    // Insert the data into the table
    db.run(query, values, (err) => {
      if (err) {
        console.error("Error inserting data:", err.message);
      } else {
        console.log(`Inserted Product_ID: ${row.Product_ID}`);
      }
    });
  })
  .on("end", () => {
    console.log("CSV file successfully processed and data inserted.");
    db.close(); // Close the database connection
  });
