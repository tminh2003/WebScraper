import { useEffect, useState } from "react";
import axios from "axios";
import SearchSuggestList from "../components/SearchSuggestList";

const SERVER_URL = "http://localhost:3000";

const SearchPage = () => {
  // For controlling user searchbar input
  const [query, setQuery] = useState("");

  // For storing the search suggestions
  const [suggestions, setSuggestions] = useState(["a", "b"]);

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
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <h1>Search for an item</h1>
        <input
          type="text"
          value={query}
          list="product-suggestions"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <SearchSuggestList suggestions={suggestions} />
      </form>
    </div>
  );
};

export default SearchPage;
