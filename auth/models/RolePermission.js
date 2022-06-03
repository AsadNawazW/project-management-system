import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const rolePermissionSchema = new mongoose.Schema({
    role: { type: mongoose.Types.ObjectId, ref: 'Role' },
    permission: { type: mongoose.Types.ObjectId, ref: 'Permission' },
});

rolePermissionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("role_permission", rolePermissionSchema);
 