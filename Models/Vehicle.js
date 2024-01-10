import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      uiniqe:true
    },
    ownerName: {
      type: String,
      min: 2,
      max: 100,
    },
    ownerType: {
      type: String,
    },
    vehiclePicture: {
      type: String,
    },
    vehicleType: {
      type: String,
      min: 5,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fasTagID: {
      type: String,uiniqe:true
    },
    mobile: Number,
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
