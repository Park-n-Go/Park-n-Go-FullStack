import mongoose from "mongoose";
import { AddressSchema } from "../../Utils/CustomSchemaModels/Address";

const UserSchema = new mongoose.Schema(
  {
    userID: { type: String, unique: true },
    firstName: {
      type: String,
      required: false,
      min: 2,
      max: 100,
    },
    lastName: {
      type: String,
      required: false,
      min: 2,
      max: 100,
    },
    userName: {
      type: String,
      min: 2,
      max: 100,
    },
    email_addresses: [{ type: String, unique: true }],
    password: {
      type: String,
      required: false,
      min: 5,
    },
    pngRole: {
      type: String,
      default: "User",
    },
    vehicleIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],

    profilePicture: { type: String },
    phoneNumbers: [{ type: String }],

    company: {
      companyID: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      companyEmployee:{isCompanyEmployees: {
        type: Boolean},jobPosition: { type: String },companyRole:{type:String}},
      
        isCompanyStaff: { type: Boolean },
        isCompanyGuards: { type: Boolean },
        
    
      
    },
    userAddress: { type: AddressSchema },
    society: {
      societyID: { type: mongoose.Schema.Types.ObjectId, ref: "Society" },
      isSocietyMembers: { type: String },
      isSocietyStaffs: { type: Boolean },
      isSocietyGuards: { type: Boolean },
      societyRole:{type:String}
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  // this?.company?.companyEmployee?.jobPosition = this?.company?.companyEmployee?.jobPosition?.toUpperCase();
console.log(this)

  next();
});


const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export default User;
