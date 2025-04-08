//Find cosine similarity between products based on their attributes
const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};
// Function to vectorize product attributes
const vectorizeProduct = (product, fields, uniqueValues) => {
  return fields.flatMap((field) => {
    const valueIndex = uniqueValues[field].indexOf(product[field]);
    return uniqueValues[field].map((_, i) => (i === valueIndex ? 1 : 0));
  });
};

// Function to find similar products based on attributes
const findSimilarProducts = (products, productName, numSimilar) => {
  // Check if the product name is provided
  const targetProduct = products.find(
    (product) => product.name.toLowerCase() == productName
  );
  // Check if the product exists in the list
  if (!targetProduct) {
    throw new Error(`Product with name "${productName}" not found.`);
  }

  // Extract unique values for each attribute
  const fields = ["product_type", "product_color", "product_material"];
  const uniqueValues = fields.reduce((acc, field) => {
    acc[field] = [...new Set(products.map((product) => product[field]))];
    return acc;
  }, {});

  // Vectorize the target product and all other products
  const targetVector = vectorizeProduct(targetProduct, fields, uniqueValues);

  // Calculate cosine similarity for each product. Complexity O(n)
  const similarities = products
    .filter((product) => product.name !== productName)
    .map((product) => {
      const productVector = vectorizeProduct(product, fields, uniqueValues);
      return {
        product,
        similarity: cosineSimilarity(targetVector, productVector),
      };
    });

  // Sort and return the most similar products
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, numSimilar)
    .map((entry) => entry.product);
};

module.exports = findSimilarProducts;
