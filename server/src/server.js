const express = require("express");
const path = require("path");

const app = express();

console.log(__dirname);
// Serve the React build folder
app.use(express.static(path.join(__dirname, "../../client/dist")));

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
