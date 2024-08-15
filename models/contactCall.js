const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  id: String,
  name: {
    displayName: String,
    number: String,
    favorite: Boolean,
  },
  date: String,
});

module.exports = mongoose.model("contactCalls", contactSchema);
