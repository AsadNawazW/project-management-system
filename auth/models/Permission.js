const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const permissionSchema = new mongoose.Schema({
    name: { type: String, default: null },
});

permissionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("permission", permissionSchema);
