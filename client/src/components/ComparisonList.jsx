import React from "react";
import "../css/ComparisonList.css"; // Assuming you will style it in a CSS file

const ComparisonList = ({ product }) => {
  console.log(product);
  if (!product) {
    return <p>No product data available.</p>;
  }

  const comparisons = [
    {
      storeName: "eBay",
      price: product.ebayPrice,
      imageUrl: "d/images/ebay-logo.png", // Replace with the actual path to the eBay logo
      link: "https://www.ebay.com",
    },
    {
      storeName: "Amazon",
      price: product.amazonPrice,
      imageUrl: "d/images/amazon-logo.png", // Replace with the actual path to the Amazon logo
      link: "https://www.amazon.com",
    },
  ];

  return (
    <div className="comparison-list">
      {comparisons.map((comparison, index) => (
        <div key={index} className="comparison-item">
          <div className="store-info">
            <strong className="store-name">{comparison.storeName}</strong>
            <span className="store-name">{product.name}</span>
          </div>
          <div className="price-info">
            <span className="price">${comparison.price}</span>
            <a
              href={comparison.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shop-now-button"
            >
              Shop Now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonList;
