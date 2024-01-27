import mongoose from "mongoose";

const VendorRolesSchema = new mongoose.Schema({
  category: {
    type: String,
    set: (value) => value?.replace(/\s/g, "")?.trim()?.toUpperCase(),
  },
  role: {
    type: String,
    set: (value) => value?.replace(/\s/g, "")?.trim()?.toUpperCase(),
  },
  permission: {
    type: String,
    set: (value) => value?.replace(/\s/g, "")?.trim()?.toUpperCase(),
  },
});

const RolesAndPermissionsSchema = new mongoose.Schema({
  vendor: { type: String, unique: true,required:true },
  vendorID:{type: String, unique:true,required:true},
  vendorType: { type: String ,required:true},
  vendorRoles: [{ type: VendorRolesSchema ,required:true}],
},{timestamps: true});

const RolesAndPermissions =
  mongoose?.models?.RolesAndPermissions ||
  mongoose.model("RolesAndPermissions", RolesAndPermissionsSchema);

export default RolesAndPermissions;
