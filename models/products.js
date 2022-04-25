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
    SELECT
    p.*,
    (SELECT json_agg(
        json_build_object(
          'feature', f.feature,
          'value', f.value
        )
      )
      FROM Features f
      WHERE f.product_id = ${productId}
    ) features
    FROM Products p
    WHERE p.id = ${productId}
    `;

    products.query(queryString)
      .then(res => callback(null, res.rows[0]))
      .catch(err => callback(err));
  },

  getStyles: (productId, callback) => {
    const styleQuery = `
    SELECT
      s.id AS "style_id",
      s.name,
      s.sale_price,
      s.original_price,
      default_style AS "default?",
      (SELECT json_agg(
        json_build_object(
          'url', p.url,
          'thumbnail_url', p.thumbnail_url
          )
        )
        FROM Photos p
        WHERE p.style_id = s.id
      ) photos,
      (SELECT json_object_agg(
        sk.id, json_build_object(
          'size', sk.size,
          'quantity', sk.quantity
          )
        )
        FROM Skus sk
        WHERE sk.style_id = s.id
      ) skus
    FROM Styles s
    WHERE s.id IN (
      SELECT s.id
      FROM Styles s
      WHERE s.product_id = ${productId}
    )
    ORDER BY s.id
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