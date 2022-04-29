const { products } = require('./db.js');

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
    const queryString = `
    SELECT *
    FROM features_mv
    WHERE id = ${productId}
    `;

    products.query(queryString)
      .then(res => callback(null, res.rows[0]))
      .catch(err => callback(err));
  },

  getStyles: (productId, callback) => {
    const styleQuery = `
    SELECT *
    FROM styles_mv
    WHERE style_id IN (
      SELECT s.id
      FROM Styles s
      WHERE s.product_id = ${productId}
    )
    `;

    products.query(styleQuery)
      .then(res => callback(null, res.rows))
      .catch(err => callback(err.stack));
  },

  getRelated: (productId, callback) => {
    const queryString = `
    SELECT related_prod_id
    FROM Related_Products
    WHERE curr_prod_id = ${productId}
    `;

    products.query(queryString)
      .then(res => {
        const relatedProducts = res.rows.map((related) => related.related_prod_id);
        callback(null, relatedProducts);
      })
      .catch(err => callback(err));
  }
}