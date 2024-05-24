const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
  },
  user_id:{
    type: String,
    required: true
  }
}, 
{
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
