import mongoose from "mongoose";


// import { v4 as uuidv4 } from "uuid";
const emailSchema = new mongoose.Schema({
  email_address: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true,
  },
  linked_to: {
    type: [String], // Assuming linked_to is an array of strings
    default: [],
  },
  object: {
    type: String,
    required: true,
  },
  verification: {
    status: {
      type: String,
      enum: ['verified', 'unverified'], // Adjust enum values based on possible statuses
      required: true,
    },
    strategy: {
      type: String,
      required: true,
    },
  },
});




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
      },email_addresses: {
        type: [emailSchema], // An array of emailSchema
        required: true,
      },
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
      phoneNumbers: [{type: String}],
  
      jobPosition: { type: String, },
      company_ID: { type: String },

    },
    { timestamps: true }
  );
  
  const User = mongoose?.models?.User || mongoose.model("User", UserSchema);
 


export default User;