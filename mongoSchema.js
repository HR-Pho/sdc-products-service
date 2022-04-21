const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsSchema = new Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [
      {
          feature: String,
          value: String,
      },
  ],
  styles: [
      {
          style_id: Number,
          name: String,
          original_price: Number,
          sale_price: Number,
          default?: Boolean,
          photos: [
              {
                  thumbnail: String,
                  url: String
              },
          ],
          skus: {
              sku_id: {
                  quantity: Number,
                  size: String
              },
          },
      },
  ],
  related: Array,
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;