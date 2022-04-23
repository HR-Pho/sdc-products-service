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
    SELECT feature, value FROM Features
    WHERE product_id = ${productId}
    ORDER BY id
    `;

    Promise.all([
      products.query(productString),
      products.query(featuresString),
    ])
      .then(res => {
        const product = {
          ...res[0].rows[0],
          features: res[1].rows,
        };
        callback(null, product);
      })
        .catch(err => callback(err));
  },

  getStyles: (productId, callback) => {
    // const styleIdQuery = `
    // SELECT id
    // FROM Styles
    // WHERE product_id = ${productId}`;

    // const styleIds = await products.query(styleIdQuery).then(res => res.rows);

    // const results = await Promise.all(styleIds.map(async (styleId) => {
    //   const styleQuery = `
    //   SELECT
    //     s.id AS style_id,
    //     s.name,
    //     s.sale_price,
    //     s.original_price,
    //     default_style AS "default?",
    //     json_agg(
    //       json_build_object(
    //         'url', p.url,
    //         'thumbnail_url', p.thumbnail_url
    //       )
    //     ) photos,
    //     json_object_agg(
    //       sk.id, json_build_object(
    //         'size', sk.size,
    //         'quantity', sk.quantity
    //       )
    //     ) skus
    //   FROM Styles s
    //   INNER JOIN Skus sk
    //   ON sk.style_id = s.id
    //   INNER JOIN Photos p
    //   ON p.style_id = s.id
    //   WHERE s.id = ${styleId.id}
    //   GROUP BY s.id
    //   `;

    //   const style = await products.query(styleQuery).then(res => res.rows[0]);
    //   return style;
    // })).catch(err => callback(err.stack))

    // callback(null, results);

    const styleQuery = `
    SELECT
      s.id,
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
    GROUP BY s.id
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