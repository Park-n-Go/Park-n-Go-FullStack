import mongoose from "mongoose";
import { AddressSchema } from "../../Utils/Custom Schema Models/Address";

const FlatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  buildingName: { type: String, required: true },
  number: { type: String, required: true },
  floor: { type: String },
});


const staffJobPositionEnum = ['indoor', 'outdoor', 'society office', 'main gate', 'others'];


const projectReraNumberisVerifiedEnum = ['applied', 'pending', 'in-progress' ,'verified', 'unverified', 'failed verification'];

const StaffSchema= new mongoose.Schema({ worker:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
jobCategory:{type:String},
jobPosition:{type:String, enum:staffJobPositionEnum, default:'others'},
providerName:{type:String}
})

const ProjectReraNumberSchema= new mongoose.Schema(
  {number:{type:String},
  isVerified:{type:String,enum: {values: projectReraNumberisVerifiedEnum,message:'{VALUE} is not supported'},default:'pending'}})

const SocietySchema = new mongoose.Schema(
  { societyID:{type:String,required: true, unique :true},
    societyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    societyEntrancePicture: { type: String},
    officePhoneNumbers: [{ type: String, required: true }],
    builderName: { type: String, required: true },
    builderOfficeAddress: { type: AddressSchema },
    societyAddress: {type: AddressSchema},
    flates: [{ type: FlatSchema }],
    societyMembers:[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    societyStaffs: [{type:StaffSchema}],
    societyGuards: [{type:StaffSchema}],
    projectReraNumber:{type:ProjectReraNumberSchema},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required:true }
  },
  { timestamps: true }
);

const Society =
  mongoose?.models?.Society || mongoose.model("Society", SocietySchema);

export default Society;
