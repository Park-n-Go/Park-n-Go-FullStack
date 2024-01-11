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
      set: value => {const removedWhiteSpace=value.replace(/\s/g, '').trim();
      const titleCase = removedWhiteSpace.charAt(0).toUpperCase() +
      removedWhiteSpace.substr(1).toLowerCase()
    return (titleCase)
    }
    },
    lastName: {
      type: String,
      required: false,
      min: 2,
      max: 100,
      set: value => {const removedWhiteSpace=value.replace(/\s/g, '').trim();
      const titleCase = removedWhiteSpace.charAt(0).toUpperCase() +
      removedWhiteSpace.substr(1).toLowerCase()
    return (titleCase)
    }
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
      set: value =>  value?.replace(/\s/g, '')?.trim()?.toUpperCase()
    },
    vehicleIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],

    profilePicture: { type: String },
    phoneNumbers: [{ type: String }],

    companies: [{
      companyID: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      companyEmployee:{isCompanyEmployee: {
        type: Boolean},jobPosition: { type: String,set: value => value?.toUpperCase() }},
        companyRoles:[{type:String,
          set: value =>  value?.replace(/\s/g, '')?.trim()?.toUpperCase()}],
      
        isCompanyStaff: { type: Boolean },
        isCompanyGuards: { type: Boolean },
        
    
      
    }],
    userAddress: { type: AddressSchema },
    societies: {
      societyID: { type: mongoose.Schema.Types.ObjectId, ref: "Society" },
      isSocietyMembers: { type: String },
      isSocietyStaffs: { type: Boolean },
      isSocietyGuards: { type: Boolean },
      societyRoles:[{type:String,
        set: value =>  value?.replace(/\s/g, '')?.trim()?.toUpperCase()}]
    },
  },
  { timestamps: true }
);



const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export default User;
