const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryName: { type: String, require: true },
    categoryCode: { type: String, require: true },
    categoryImg: { type: String, require: true },
    categoryFlag: { type: Boolean, require: true },
})
module.exports = mongoose.model('categories', schema);
