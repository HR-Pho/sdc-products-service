const models = require('../models');

module.exports = {
  getAll: (req, res) => {
    const { page, count} = req.query;

    models.allProducts.getAll(page, count, (err, products) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(products);
      }
    });
  },

  getOne: (req, res) => {
    const { product_id:productId } = req.params;

    models.allProducts.getOne(productId, (err, product) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(product);
      }
    });
  },

  getStyles: (req, res) => {
    const { product_id:productId } = req.params;

    models.allProducts.getStyles(productId, (err, styles) => {
      if (err) {
        res.sendStatus(404);
      } else {
        const result = {
          product_id: productId,
          results: styles,
        }
        res.send(result);
      }
    });
  },

  getRelated: (req, res) => {
    const {product_id:productId } = req.params;

    models.allProducts.getRelated(productId, (err, relatedProducts) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(relatedProducts);
      }
    })
  }
}