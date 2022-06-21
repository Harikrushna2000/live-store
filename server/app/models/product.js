const mongoose = require("mongoose");

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productName: { type: String, require: true },
  categoryCode: { type: String, require: true },
  productCode: { type: String, require: true },
  productImg: { type: String, require: true },
  productFlag: { type: Boolean, require: true },
  productDescription: { type: String, require: true },
  productPrice: { type: String, require: true },
});
module.exports = mongoose.model("products", schema);
