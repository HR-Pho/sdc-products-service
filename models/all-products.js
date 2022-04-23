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

  getStyles: async (productId, callback) => {
    // products.query(`
    //   SELECT st.*, photos
    //   FROM Styles st,
    //     (SELECT row_to_json(p)
    //       FROM (
    //         SELECT ph.url, ph.thumbnail_url
    //         FROM Photos ph
    //         WHERE ph.style_id = 2
    //       ) p
    //     ) photos
    //     WHERE st.product_id = ${productId}
    // `).then(res => console.log(res.rows)).catch(err => console.log(err));



    //gets put into a results array
    const stylesQuery = `
    SELECT * FROM Styles
    WHERE product_id = ${productId}
    `;

    //gets added to the style object
    const photosQuery = `
    SELECT url, thumbnail_url
    FROM Photos
    WHERE
    `;


    // {
    //   product_id,
    //   results: [
    //     {
    //       style
    //       photos
    //     }
    //     skus : {
    //       sku_id: {
    //         quantity:
    //         size:
    //       }
    //     },
    //   ]
    // }

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