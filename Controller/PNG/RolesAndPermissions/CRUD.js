import User from "../../../Models/User/User.js";
// import Company from "../../Models/Company/Company";
// import Society from "../../Models/Society/Society";
import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";
import { removeKeyValuePairsFromAnObject } from "@/Utils/removeKeyValuePairsFromAnObject";
import { filterOBJwithKeys } from "@/Utils/filterOBJwithKeys";
import { chunkify } from "@/Utils/chunkify";
import RolesAndPermissions from "@/Models/RolesAndPermissions/RolesAndPermissions.js";
import Company from "@/Models/Company/Company.js";
import Society from "@/Models/Society/Society.js";
import { isUserAllowedToPerformRolesAndPermissionsCRUD } from "@/Utils/isUserAllowedToPerformRolesAndPermissionsCRUD.js";


const PARKANDGO=process.env.PARKANDGO
const PARKANDGOVENDORID=process.env.PARKANDGOVENDORID

const DEFAULTPARKANDGOROLES=["SUPER_ADMIN","ADMIN","OWNER","OPERATOR","ANALYST","EMPLOYEE"]
const DEFAULTCOMPANYROLES = [
  "OWNER",
  "SUPER_ADMIN",
  "ADMIN",
  "OPERATOR",
  "ANALYST",
  "OUTTER_GUARD",
  "INNER_GUARD",
  "MAIN_GATE_GUARD",
  "MAINTANCE_WORKER",
  "EMPLOYEE",
  "VISITOR",
  "CLIENT",
  "GUEST",
]
const DEFAULTSOCIETYROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "OPERATOR",
  "ANALYST",
  "OUTTER_GUARD",
  "INNER_GUARD",
  "MAIN_GATE_GUARD",
  "MAINTANCE_WORKER",
  "TENENT",
  "OWNER",
  "SOCIETY_MEMBER",
  "SOCIETY_CHAIRMAN",
  "GUEST",
  "MAID",
];


export const createPNGRolesAndPermissions = async (req, res) => {
  try {
    const payLoad = req?.body;
   
    
    //Check if User is already present
   if((!payLoad?.userName && !payLoad?.userID) || !payLoad?.password ){
    return { body: "Credentials missing!", status: { status: 400 } };

   }

   if(!payLoad?.pngRole || Object.keys(payLoad?.pngRole).length === 0 ){
    return { body: "pngRoles is missing!", status: { status: 400 } };

   }

   if(!payLoad.pngRole.vendorID){
    return { body: "VendorID is missing!", status: { status: 400 } };

   }





 

    const user = (await User.findOne({ userID: payLoad?.id })) || (await User.findOne({email_addresses:payLoad?.email_addresses
    })) || (await User.findOne({phoneNumbers: payLoad?.phoneNumbers})) || (await User.findOne({userName: payLoad?.userName}))
    if(!user){
      return { body: "User Not Found!", status: { status: 400 } };
    }

    if(!bcrypt.compareSync(payLoad?.password,user?.password)){
      return { body: "Wrong Credentials!", status: { status: 400 } };
    }
    let record={};
if(payLoad.pngRole.vendorID === PARKANDGOVENDORID){
record["PNG"]=PARKANDGO
}else if(payLoad.pngRole.vendorType === "COMPANY"){
      record["company"] = await Company.findOne({companyID:payLoad.pngRole.vendorID})

   

    }else if(payLoad.pngRole.vendorType === "SOCIETY"){
      record["society"] = await Society.findOne({societyID:payLoad.pngRole.vendorID})
    }else{
      return { body: "Invalid Vendor Type!", status: { status: 400 } };
    }

if(!record.PNG && !record.company && !record.society){
  return { body: "Vendor is not onboarded yet!", status: { status: 400 } };
}

    const rolesAndPermissions_Check = await RolesAndPermissions.findOne({vendorID:payLoad.pngRole.vendorID}) 
    if(rolesAndPermissions_Check){
     return { body: "Vendor is already have Role and Permission sets!", status: { status: 400 } };
 
    }
const isUserAllowed=isUserAllowedToPerformRolesAndPermissionsCRUD(user,payLoad,record)

    if(isUserAllowed){

      return { body: "Forbidden request!", status: { status: 403 } };
    }
  
    let pngRolesOBJ;

if(payLoad.pngRole.vendorID === PARKANDGOVENDORID){
  pngRolesOBJ =  {vendor:PARKANDGO,vendorID:PARKANDGOVENDORID,
    vendorType:"COMPANY",vendorRoles: [...DEFAULTPARKANDGOROLES.map((DEFAULTPARKANDGOROLE)=>{
    return({role:DEFAULTPARKANDGOROLE,category:"DEFAULT",permission:"DEFAULT"})
    
      }),...(payLoad.pngRole.vendorRoles.filter((vendorRole)=>(!DEFAULTPARKANDGOROLES.includes(vendorRole.role) )))]
    
    }

}else if(payLoad.pngRole.vendorType === "COMPANY"){
  pngRolesOBJ =  {vendor:record.company.companyName,
    vendorID: record.company.companyID ,vendorType:"COMPANY",vendorRoles: [...DEFAULTCOMPANYROLES.map((DEFAULTCOMPANYROLE)=>{
    return({role:DEFAULTCOMPANYROLE,category:"DEFAULT",permission:"DEFAULT"})
    
      }),...(payLoad.pngRole.vendorRoles.filter((vendorRole)=>(!DEFAULTCOMPANYROLES.includes(vendorRole.role) )))]}
}else if(payLoad.pngRole.vendorType === "SOCIETY"){
  pngRolesOBJ =  {vendor:record.society.societyName,
    vendorID: record.society.societyID ,vendorType:"SOCIETY",vendorRoles: [...DEFAULTSOCIETYROLES.map((DEFAULTSOCIETYROLE)=>{
    return({role:DEFAULTSOCIETYROLE,category:"DEFAULT",permission:"DEFAULT"})
    
      }),...(payLoad.pngRole.vendorRoles.filter((vendorRole)=>(!DEFAULTSOCIETYROLES.includes(vendorRole.role) )))]}
}

   
const pngRoles = new RolesAndPermissions(pngRolesOBJ);
await pngRoles.save();
if(record.company){

  await Company.findByIdAndUpdate(record.company._id,{companyRoles:pngRoles.vendorRoles.map((vendorRole)=>(vendorRole.role))
})

}else if(record.society){
  await Society.findByIdAndUpdate(record.society._id,{societyRoles:pngRoles.vendorRoles.map((vendorRole)=>(vendorRole.role))
  })
}
    return { body: pngRoles, status: { status: 201 } };
  } catch (error) {
    return {
      body: {
        error_code: 400,
        error_message: error.message,
      },
      status: { status: 400 },
    };
  }
};

// User updataion
export const updateUser = async (req, res) => {
  try {
    
    const payload = { ...req?.body };

    if (Object.keys(payload).length === 0) {
      return {
        body: {
          error_code: 404,
          error_message: "No Payload!",
        },
        status: { status: 404 },
      };
    }
    
    const user_data = await User.findOne({
      userName: payload?.userName,
    }) || await User.findOne({
      userID: payload?.userID,
    }) || await User.findById(payload?.id) || await User.findById(payload?.userID) || await User.findById(payload?._id) || null
    
    if (!user_data) {
      return {
        body: {
          error_code: 404,
          error_message: "User Not Found!",
        },
        status: { status: 404 },
      };
    }
 
    const userObj = removeNullValueFromAnObject({
      firstName: payload?.first_name || payload?.firstName || null,
      lastName: payload?.last_name || payload?.lastName || null,
      email_addresses:
      payload.email_addresses.length > 0
          ? (payload.email_addresses || null)
          :  null ,
      phoneNumbers:
      payload.phoneNumbers.length > 0
          ? (payload.phoneNumbers || null)
          : null,
      vehicleIDs: payload?.vehicleIDs || null,
      pngRoles: payload?.pngRoles || null,
      societies:payload?.societies || [],
      companies:payload?.companies || [],
      userAddress:payload?.userAddress || null,
      profilePicture:payload?.profilePicture || null,
      userAddress:payload?.userAddress || null,
      userName: payload?.userName || null,
      password: payload?.password ? bcrypt.hashSync(payload?.password, parseInt(process.env.HASH_SALT)) : 
null
    });
    const updatedUser = await User.findOneAndUpdate(
      { userID: user_data.userID },
     removeNullValueFromAnObject(userObj),
      {
        new: true,
      }
    );

    return { body: { updatedUserData:updatedUser,priviousUserData: user_data }, status: { status: 200 } };
  } catch (error) {
    return {
      body: {
        error_code: 400,
        error_message: `Error message - ${error}`,
      },
      status: { status: 400 },
    };
  }
};

// User deletion
export const deleteUser = async (req, res) => {
  try {

    const payload = { ...req?.body };

    if (Object.keys(payload).length === 0) {
      return {
        body: {
          error_code: 404,
          error_message: "No Payload!",
        },
        status: { status: 404 },
      };
    }
    
    const user_data = await User.findOne({
      userName: payload?.userName,
    }) || await User.findOne({
      userID: payload?.userID,
    }) || await User.findById(payload?.id) || await User.findById(payload?.userID) || await User.findById(payload?._id) || null
    
    if (!user_data) {
      return {
        body: {
          error_code: 404,
          error_message: "User Not Found!",
        },
        status: { status: 404 },
      };
    }


    
   await User.findByIdAndDelete(user_data._id);
   return { body: { isDeleted: true }, status: { status: 200 } };
  } catch (error) {
    return {
      body: {
        error_code: 400,
        error_message: `Error message - ${error}`,
      },
      status: { status: 400 },
    };
  }
};

// GET ALL User
export const getUsers = async (req, res) => {
  try {
    const { skip, count,select } = req?.query;

    const start = parseInt(skip || 0);
    const end = (start + (parseInt(count && count <= 1000 ? count : 1000) ));
    const filteredByFields = select ? select.split(',') : [];
   

    let users = await User.find().lean()
    const totalRecords = users.length
    users = users.map((user) => 
    {

      const userWithOutSensitiveValues = {
       ...removeKeyValuePairsFromAnObject(user, [
          "password",
        ])
      }

      if(filteredByFields.length === 0){

return (userWithOutSensitiveValues)
      }
      
      const filteredUser = filterOBJwithKeys(user,filteredByFields)

      if(Object.keys(filteredUser).length === 0) {
        return null
      }

   return (filteredUser)
  }
    );
    const page = chunkify(users,start,end);

    return {
      body: {
        users: page,
        count: page?.length,
        totalRecords
      },
      status: { status: 200 },
    };
  } catch (error) {
    return {
      body: {
        error_code: 400,
        error_message: `Error message - ${error}`,
      },
      status: { status: 400 },
    };
  }
};

