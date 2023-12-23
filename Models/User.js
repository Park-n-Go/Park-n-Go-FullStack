import mongoose from "mongoose";


// import { v4 as uuidv4 } from "uuid";

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
      email: {
        type: String,
        required: false,
        max: 50,
        unique: true,
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
      mobile: Number,
  
      jobPosition: { type: String, },
      company_ID: { type: String },
    },
    { timestamps: true }
  );
  
  const User = mongoose?.models?.User || mongoose.model("User", UserSchema);
 


export default User;