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
    },
    email_addresses: [{ type: String }],
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
    phoneNumbers: [{ type: String }],

    jobPosition: { type: String },
    company_ID: { type: String },
    address: {flatNumber:{type:String},scoiety:{type: mongoose.Schema.Types.ObjectId, ref: "Society"}},
  },
  { timestamps: true }
);

const User = mongoose?.models?.User || mongoose.model("User", UserSchema);

export default User;
