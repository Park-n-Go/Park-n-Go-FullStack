import User from "@/Models/User/User";
import Company from "../../Models/Company/Company";
import { createUser } from "../User/CRUD";

export const createCompany = async (req, res) => {
  try {
    const {
      
companyName,
companyOfficeEmail,
companyProfilePicture,
officePhoneNumbers,
buildingName,
headOfficeAddress,
companyAddress,
companyEmployees,
staffs,
companyGuards,
companyLocation,
subcriptionTaken,
subcriptionValidity,
enrollmentDate,
gstNumber,
createdBy
    } = req.body;
const companyID = ((companyName.replace(/\s/g, '').toLowerCase())+(officePhoneNumbers[0]))
      const company_check = await Company.findOne({companyID});
    //Check if Company is already present
    
    if (company_check) {
      return {
        body: {
          error_code: 400,
          error_message: "Company is already exist!",
        },
        status: { status: 400 },
      };
    }
    

    const companyObj ={
      
      companyName,
      companyOfficeEmail,
      companyProfilePicture,
      officePhoneNumbers,
      buildingName,
      headOfficeAddress,
      companyAddress,
      companyEmployees,
      staffs,
      companyGuards,
      companyLocation,
      subcriptionTaken,
      subcriptionValidity,
      enrollmentDate,
      gstNumber,
      createdBy: (await User.findOne({ uuid: createdBy?.uuid })) || (await User.findOne({email_addresses:createdBy.email_addresses
      })) || (await User.findOne({phoneNumbers: createdBy.phoneNumbers})) || (await createUser({body:createdBy}))._id
   
          }
    
 

    //Company creation
    const company = new Company(companyObj);
    await company.save();
    const company_res = await Company.findById(company._id, {_id:0,
      __v: 0,
      _id:0
    });
    return { body: company_res, status: { status: 201 } };
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

// Company updataion
export const updateCompany = async (req, res) => {
  try {
    const company_data = await Company.findOne({companyID:req.body.companyID});
    if (!company_data) {
      return {
        body: {
          error_code: 404,
          error_message: "Company Not Found",
        },
        status: { status: 400 },
      };
    }

    const { companyID, gstNumber, ...reqDataWithOutReraNumber } = req.body;

    //merging two objects
    const companyObj = Object.assign({}, reqDataWithOutReraNumber, {
      gstNumber: company_data?.gstNumber
        ? company_data.gstNumber
        : req?.body?.gstNumber,
    });

    const updatedCompany = await Company.findOneAndUpdate({companyID}, companyObj, {
      new: true
    }).select(['-_id','-companyID','-__v'])    ;


    return { body: { updatedCompany }, status: { status: 200 } };
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

// Company deletion
export const deleteCompany = async (req, res) => {
  try {
    const {companyID} = req.body;
    const company = await Company.findOne({companyID});
    if (!company) {
      return {
        body: {
          error_code: 404,
          error_message: "Company Not Found",
        },
        status: { status: 400 },
      };
    }
    await Company.findByIdAndDelete(company._id);
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
