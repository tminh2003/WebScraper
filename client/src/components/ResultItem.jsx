import { useNavigate } from "react-router-dom";

import "../css/ResultItem.css"; // Assuming you have a CSS file for styling

// ProductCard.jsx
import React from "react";

const ResultItem = ({ product }) => {
  console.log("Product:", product);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/compare?productId=${product.name}`);
  };
  return (
    <div onClick={handleClick} className="result-item">
      <h2 className>{product.name}</h2>
      <p className="">Type: {product.type}</p>
      <p className="">Color: {product.color}</p>
      <p className="">Material: {product.material}</p>
      <p className="">
        $
        {product.amazonPrice > product.ebayPrice
          ? product.amazonPrice
          : product.ebayPrice}
      </p>
    </div>
  );
};

export default ResultItem;
