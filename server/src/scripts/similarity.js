function findProductsByType(products, targetProduct) {
  const start = process.hrtime(); // Start time measurement
  if (
    !products ||
    !targetProduct ||
    !Array.isArray(products) ||
    typeof targetProduct !== "object" ||
    !targetProduct.type
  ) {
    return "Invalid input.";
  }

  const similarProducts = products.filter(
    (product) =>
      product.type === targetProduct.type && product.id !== targetProduct.id
  );
  const diff = process.hrtime(start);
  const timeInMs = diff[0] * 1000 + diff[1] / 1e6;
  console.log(
    `Time taken to look for recommendations: ${timeInMs.toFixed(3)} ms`
  );
  return similarProducts;
}

module.exports = findProductsByType;
