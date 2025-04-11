import "../css/SearchSuggestList.css"; // Assuming you have a CSS file for

import { useNavigate } from "react-router-dom";

export default function SearchSuggestList({ suggestions }) {
  const navigate = useNavigate();
  if (!suggestions.length) return null;

  return (
    <ul className="search-suggestions">
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={(e) => {
            // Redirect to result page with query parameter
            console.log("hi");
            navigate(`/result?q=${e.target.innerText}`);
          }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
}
