import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uuid: { type: String },
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
      required: false,
      min: 2,
      max: 100,
      unique:true
    },
    email_addresses: [{ type: String, unique:true }],
    password: {
      type: String,
      required: false,
      min: 5,
    },
    role: {
      type: String,
      default: "User",
    },
    vehicle_IDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],

    profilePicture: String,
    phoneNumbers: [{ type: String}],

    jobPosition: { type: String },
    company_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  },
  { timestamps: true }
);

const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export default User;
