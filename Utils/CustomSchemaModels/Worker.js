import mongoose from "mongoose";

export const WorkerSchema = new mongoose.Schema({ worker:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
jobCategory:{type:String},
jobPosition:{type:String},
providerName:{type:String}
})

