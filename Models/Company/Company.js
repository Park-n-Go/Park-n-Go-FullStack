import mongoose from "mongoose";

const FlatSchema = new mongoose.Schema({
  type: { type: String, required: true },
  buildingName: { type: String, required: true },
  number: { type: String, required: true },
  floor: { type: String },
});

const AddressSchema = new mongoose.Schema({
  addresslineOne: { type: String, required: true },
  addresslineTwo: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  pinCode: { type: Number, required: true },
  landMark: { type: String },
});

const staffJobPositionEnum = ['indoor', 'outdoor', 'company office', 'main gate', 'others'];


const projectReraNumberisVerifiedEnum = ['applied', 'pending', 'in-progress' ,'verified', 'unverified', 'failed verification'];

const StaffSchema= new mongoose.Schema({ worker:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
jobCategory:{type:String},
jobPosition:{type:String, enum:staffJobPositionEnum, default:'others'},
providerName:{type:String}
})

const ProjectReraNumberSchema= new mongoose.Schema(
  {number:{type:String},
  isVerified:{type:String,enum: {values: projectReraNumberisVerifiedEnum,message:'{VALUE} is not supported'},default:'pending'}})

const CompanySchema = new mongoose.Schema(
  { companyID:{type:String,required: true, unique},
    companyName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    companyEntrancePicture: { type: String},
    officePhoneNumbers: [{ type: String, required: true }],
    builderName: { type: String, required: true },
    builderOfficeAddress: { type: AddressSchema, required: true },
    companyAddress: { type: AddressSchema },
    flates: [{ type: FlatSchema }],
    companyMembers:[[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]],
    companyStaffs: [{type:StaffSchema}],
    companyGuards: [{type:StaffSchema}],
    projectReraNumber:{type:ProjectReraNumberSchema},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required:true }
  },
  { timestamps: true }
);

const company =
  mongoose?.models?.Company || mongoose.model("Company", CompanySchema);

export default company;
