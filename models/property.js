// Property.js
const mongoose = require('mongoose');
const {Schema} = mongoose;

const propertySchema = new Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  schools: {
    type: Boolean,
    default: false
  },
  colleges: {
    type: Boolean,
    default: false
  }
});

const PropertyModel = mongoose.model('Property', propertySchema);

module.exports = PropertyModel;
