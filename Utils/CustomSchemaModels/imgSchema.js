import mongoose from "mongoose";
export const imageSchema = new mongoose.Schema({url:{type:String},source:{type:String}})