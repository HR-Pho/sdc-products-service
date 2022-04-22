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
    })
  }
}