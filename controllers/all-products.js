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
  }
}