export default function SearchSuggestList({ suggestions }) {
  console.log(Array.isArray(suggestions), suggestions);

  return (
    <datalist id="product-suggestions">
      {suggestions.map((suggestion, index) => (
        <option key={index} value={suggestion} />
      ))}
    </datalist>
  );
}
