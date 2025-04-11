// ProductCard.jsx
import React from "react";

const ProductPreview = ({ product }) => {
  const image = null;
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {image && (
        <img className="w-full h-48 object-cover" src={image} alt={name} />
      )}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-700">Color: {product.product_color}</p>
        <p className="text-sm text-gray-700">
          Material: {product.product_material}
        </p>
        <p className="text-xl font-bold text-green-600">
          ${product.amazon_price}
        </p>
      </div>
    </div>
  );
};

export default ProductPreview;
