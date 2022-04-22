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
  }
}