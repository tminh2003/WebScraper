import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import ResultItem from "../components/ResultItem"; // Adjust the import path as necessary

import "../css/ResultPage.css"; // Assuming you have a CSS file for styling

const ResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/search?query=" + query
        );
        console.log("Response from server:", response.data);
        setResults(response.data.similarProducts); // ✅ fix here
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <h1 className="result-page-h1">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul className="result-list">
          {results.map((result) => (
            <ResultItem product={result} />
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default ResultPage;
