import mongoose from "mongoose";
import { WorkerSchema } from "../../Utils/CustomSchemaModels/Worker";
import { ParkingRateSchema } from "@/Utils/CustomSchemaModels/ParkingRate";
import { AddressSchema } from "@/Utils/CustomSchemaModels/Address";
import { imageSchema } from "@/Utils/CustomSchemaModels/imgSchema";
import { equipmentSchema } from "@/Utils/CustomSchemaModels/equipments";

const CompanySchema = new mongoose.Schema(
  {
    companyID: { type: String, required: true, unique:true },
    companyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    companyOfficeEmail: [{ type: String, required: true, unique: true }],
    companyProfilePicture: { type: imageSchema },
    officePhoneNumbers: [{ type: String, required: true }],
    buildingName: { type: String, required: true },
    headOfficeAddress: { type: AddressSchema},
    companyAddress: {
      type: AddressSchema
    },

    companyEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    companyStaff: [{ type: WorkerSchema }],
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
    parkingRate: {type: ParkingRateSchema },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },companyRoles:[{type:String,unique:true}],
    equipments: [{type:equipmentSchema}]
  },
  { timestamps: true }
);

const Company =
  mongoose?.models?.Company || mongoose.model("Company", CompanySchema);

export default Company;
