import { useEffect, useState } from "react";
import axios from "axios";
import SearchSuggestList from "../components/SearchSuggestList";
import { useNavigate } from "react-router-dom";

import "../css/SearchPage.css"; // Import your CSS file for styling

const SERVER_URL = "http://localhost:3000";

const SearchPage = () => {
  // For controlling user searchbar input
  const [query, setQuery] = useState("");

  // For storing the search suggestions
  const [suggestions, setSuggestions] = useState([]);
  // Hook to programmatically navigate
  const navigate = useNavigate();

  //When user press submit button
  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      // Redirect to result page with query parameter
      navigate(`/result?q=${query}`);
    }
  };

  // Get suggestions from the server
  useEffect(() => {
    const getSuggestions = async (query) => {
      try {
        // Send a GET request to the /suggestions endpoint with query as a parameter
        const response = await axios.get(`${SERVER_URL}/suggestions`, {
          params: { query },
        });

        // Update suggestions state with the fetched data
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    // Only fetch suggestions if the query is not empty
    if (query.trim() !== "") {
      getSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <h1>Search for an item</h1>
        <input
          className="search-bar"
          type="text"
          value={query}
          list="product-suggestions"
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchSuggestList suggestions={suggestions} />
      </form>
    </div>
  );
};

export default SearchPage;
