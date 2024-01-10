import mongoose from "mongoose";
import { WorkerSchema } from "../../Utils/CustomSchemaModels/Worker";

const CompanySchema = new mongoose.Schema(
  {
    companyID: { type: String, required: true, unique },
    companyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    companyOfficeEmail: { type: String, required: true, unique: true },
    companyProfilePicture: { type: String },
    officePhoneNumbers: [{ type: String, required: true }],
    buildingName: { type: String, required: true },
    headOfficeAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    companyAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    companyEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comapnyStaff: [{ type: WorkerSchema }],
    companyGuards: [{ type: WorkerSchema }],
    companyLocation: { type: String },
    subcription: {
      subcriptionStatus: { type: String },
      subcriptionTaken: { type: String },
      subcriptionValidity: { type: String },
    },
    enrollmentDate: { type: String },
    companyGSTNumber: { type: String, required: true, unique: true },
    companyPANNumber: { type: String, required: true, unique: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Company =
  mongoose?.models?.Company || mongoose.model("Company", CompanySchema);

export default Company;
