import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import ComparisonList from "../components/ComparisonList";
import "./css/ComparisonPage.css";

const ComparisonPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("productId") || "";

  const [product, setProduct] = useState({});
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/product?productId=" + query
        );
        console.log("Response from server:", response.data.product);
        setProduct(response.data.product);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProduct({});
      }
    };

    if (query) {
      fetchResults();
    }
  }, []);

  return (
    <div className="container">
      <p>Price comparisons for {product.name}</p>
      <ComparisonList product={product} />
    </div>
  );
};

export default ComparisonPage;
