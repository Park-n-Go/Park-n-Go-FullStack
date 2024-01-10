import mongoose from "mongoose";
import { AddressSchema } from "../../Utils/CustomSchemaModels/Address";
import { WorkerSchema } from "../../Utils/CustomSchemaModels/Worker";

const FlatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  buildingName: { type: String, required: true },
  number: { type: String, required: true },
  floor: { type: String },
});

const ProjectReraNumberSchema = new mongoose.Schema({
  number: { type: String },
  isVerified: { type: String },
});

const SocietySchema = new mongoose.Schema(
  {
    societyID: { type: String, required: true, unique: true },
    societyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    societyEntrancePicture: { type: String },
    officePhoneNumbers: [{ type: String, required: true }],
    builderName: { type: String, required: true },
    builderOfficeAddress: { type: AddressSchema },
    societyAddress: { type: AddressSchema },
    flates: [{ type: FlatSchema }],
    societyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    societyStaffs: [{ type: WorkerSchema }],
    societyGuards: [{ type: WorkerSchema }],

    subcription: {
      subcriptionStatus: { type: String },
      subcriptionTaken: { type: String },
      subcriptionValidity: { type: String },
    },
    enrollmentDate: { type: String },
    projectReraNumber: { type: ProjectReraNumberSchema },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Society =
  mongoose?.models?.Society || mongoose.model("Society", SocietySchema);

export default Society;
