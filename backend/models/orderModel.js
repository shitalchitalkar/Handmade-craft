const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // for customer role user
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // for order product
      required: true
    },
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //  for artisan role user
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);