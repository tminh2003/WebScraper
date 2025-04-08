import { useNavigate } from "react-router-dom";

const ResultItem = ({ result }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/compare?productId=${result.name}`);
  };
  return (
    <a className="result-item" onClick={handleClick}>
      <h3>{result.name}</h3>
    </a>
  );
};

export default ResultItem;
