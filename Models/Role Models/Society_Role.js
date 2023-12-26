import mongoose from "mongoose";

const SocietyRoleSchema = new mongoose.Schema(
  {societyID:{type: mongoose.Schema.Types.ObjectId, ref: "Society"},
   societyRole:[{type:String}]
  },
  { timestamps: true }
);

const SocietyRole = mongoose?.models?.SocietyRole || mongoose.model("SocietyRole", SocietyRoleSchema);

export default SocietyRole;
