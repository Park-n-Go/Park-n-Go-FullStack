import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    ownerName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    ownerType: {
      type: String,
      required: true,
    },
    vehiclePicture: {
      type: String,
    },
    vehicleType: {
      type: String,
      required: true,
      min: 5,
    },
    staff_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fasTag_ID: {
      type: String,
    },
    mobile: Number,
  },
  { timestamps: true }
);

// const Vehicle = mongoose.model("Vehicle", VehicleSchema);
// export default Vehicle;
