const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const roleSchema = new mongoose.Schema({
    name: { type: String, default: null },
});

roleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("role", roleSchema);
