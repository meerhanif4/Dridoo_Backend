// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
  position: String,
  companyName: String,
  companyPhone: String,
  companyAddress: String,
  contactName: String,
  contactJobTitle: String,
  contactEmail: String,
  altContactName: String,
  altContactJobTitle: String,
  altContactEmail: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
