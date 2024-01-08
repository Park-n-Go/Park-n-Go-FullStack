import mongoose from "mongoose";

export const AddressSchema = new mongoose.Schema({
    addresslineOne: { type: String, required: true },
    addresslineTwo: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    landMark: { type: String },
  });

