import mongoose from "mongoose";
export const equipmentSchema = new mongoose.Schema({name:{type:String},location:{type:String},equipmentIDs:{type:String}})