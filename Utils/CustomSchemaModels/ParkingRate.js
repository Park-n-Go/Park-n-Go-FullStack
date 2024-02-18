import mongoose from "mongoose";

const feeIncrementalSchema = new mongoose.Schema({
  type:{type:String,
    set: value =>  value?.replace(/\s/g, '')?.trim()?.toUpperCase()},

  increasedBy:{type:Number},
  after:{type:Number},


})
  

const RateSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  currencyCode: { type: String, requied: true },
  currencySymbol: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    requied: true,
    unique: true
  },
  hourly: { type: Boolean, required: true },
  
  incrementalFee: {type:feeIncrementalSchema}
});

export const ParkingRateSchema = new mongoose.Schema(
  {
   rates: [{type: RateSchema}],
  },
  { timestamps: true }
);
