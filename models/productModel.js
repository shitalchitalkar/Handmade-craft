const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 

  },
 price: {
     type: Number,
      required: true 
    },
  stock: { 
    type: Number,
     default: 1 
    },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
 },
  image: String,

  artisan: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
     }, // who added
  isApproved: { 
    type: Boolean, 
    default: false 
}, // admin approval
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('Product', productSchema);