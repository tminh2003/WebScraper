import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  // Example data to simulate search results
  const results = [
    "Apple iPhone 14",
    "Samsung Galaxy S23",
    "Sony PlayStation 5",
    "Microsoft Xbox Series X",
    "Nike Running Shoes",
    "Adidas Sportswear",
    "Amazon Kindle",
    "MacBook Pro",
    "Dell XPS 13",
    "Google Pixel 7",
  ];

  // Filter results based on query
  const filteredResults = results.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {filteredResults.length > 0 ? (
        <ul>
          {filteredResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default ResultPage;
