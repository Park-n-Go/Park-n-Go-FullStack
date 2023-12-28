import mongoose from "mongoose";




const StaffSchema= new mongoose.Schema({ staff:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
jobCategory:{type:String},
jobPosition:{type:String},
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
    companyOfficeEmail:{type: String, required:true,unique:true},
    companyProfilePicture: { type: String},
    officePhoneNumbers: [{ type: String, required: true }],
    buildingName: { type: String, required: true },
    headOfficeAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    companyAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
    
    companyEmployees:[[{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]],
    staffs: [{type:StaffSchema}],
    companyGuards: [{type:StaffSchema}],
    companyLocation:{type:String},
    subcriptionTaken:{type:String},
    subcriptionValidity:{type:String},
    enrollmentDate:{type:String},
    gstNumber:{type:String,required:true,unique:true},
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required:true }
  },
  { timestamps: true }
);

const Company =
  mongoose?.models?.Company || mongoose.model("Company", CompanySchema);

export default Company;
