const { products } = require('../db.js');

module.exports = {
  getAll: (page = 1, count = 5, callback) => {
    const queryString = `
    SELECT * FROM Products
    ORDER BY id
    LIMIT ${count}
    OFFSET ${(page - 1) * count}
    `
    products
      .query(queryString)
      .then(res => callback(null, res.rows))
      .catch(err => callback(err.stack));
  },

  getOne: (productId, callback) => {
    const productString = `
    SELECT * FROM Products
    WHERE id = ${productId}
    `;

    const featuresString = `
    SELECT * FROM Features
    WHERE product_id = ${productId}
    ORDER BY id
    `;

    products.query(productString)
      .then((productResult) => {
        const product = productResult.rows[0];
        products.query(featuresString)
          .then((featuresResult) => {
            const features = [];
            featuresResult.rows.forEach((item) => {
              const { feature:featureName, value } = item;
              const feature = {
                feature: featureName,
                value
              };
              features.push(feature);
            })
            product.features = features;
            callback(null, product);
          })
          .catch(err => callback(err.stack));
      })
      .catch(err => callback(err.stack));
  }
}