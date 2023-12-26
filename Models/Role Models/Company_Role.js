import mongoose from "mongoose";

const CompanyRoleSchema = new mongoose.Schema(
  {
   companyRole:[{type:String}]
  },
  { timestamps: true }
);

const CompanyRole = mongoose?.models?.CompanyRole || mongoose.model("CompanyRole", CompanyRoleSchema);

export default CompanyRole;
