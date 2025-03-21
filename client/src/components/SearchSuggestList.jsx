export default function SearchSuggestList({ suggestions }) {
  console.log(Array.isArray(suggestions), suggestions);

  return (
    <ul className="suggestion-list">
      {suggestions.map((suggestion) => (
        <li key={suggestion}>{suggestion}</li>
      ))}
    </ul>
  );
}
