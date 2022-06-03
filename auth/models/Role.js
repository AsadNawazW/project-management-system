import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const roleSchema = new mongoose.Schema({
    name: { type: String, default: null },
});

roleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("role", roleSchema);
