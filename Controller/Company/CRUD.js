import { removeKeyValuePairsFromAnObject } from "@/Utils/removeKeyValuePairsFromAnObject";
import Company from "../../Models/Company/Company";
import { findOrCreateUser } from "@/Utils/findOrCreateUser";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";
import User from "@/Models/User/User";
import { filterOBJwithKeys } from "@/Utils/filterOBJwithKeys";

const DEFAULTCOMPANYROLES = ['OWNER', 'SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'ANALYST', 'OUTTER_GUARD', 'INNER_GUARD', 'MAIN_GATE_GUARD', 'MAINTANCE_WORKER', 'EMPLOYEE', 'OWNER', 'VISITOR', 'CLIENT', 'GUEST']


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
      comapnyStaff,
      companyGuards,
      companyLocation,
      subcription,
      enrollmentDate,
      companyGSTNumber,
      companyPANNumber,
      parkingRate,
      createdBy,
      companyRoles
    } = req.body;
    const companyID =
      companyName.replace(/\s/g, "").toLowerCase() + officePhoneNumbers[0];
    const company_check = await Company.findOne({ companyID });
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

    const customRoles = ((companyRoles && companyRoles.length > 0) ? companyRoles : [] )



    const companyObj = {
      companyID,
      companyName,
      companyOfficeEmail,
      companyProfilePicture,
      officePhoneNumbers,
      buildingName,
      headOfficeAddress,
      companyAddress,
      companyEmployees: companyEmployees
        ? (
            await findOrCreateUser(
              companyEmployees.map((employee) => ({ worker: employee }))
            )
          ).map((employee) => employee?.worker) || []
        : [],
      companyStaff: comapnyStaff
        ? (await findOrCreateUser(comapnyStaff)) || []
        : [],
      companyGuards: companyGuards
        ? (await findOrCreateUser(companyGuards)) || []
        : [],
      companyLocation,
      subcription,
      enrollmentDate,
      companyGSTNumber,
      companyPANNumber,
      parkingRate,
      createdBy: createdBy ? (await findOrCreateUser(createdBy)) || null : null,
      companyRoles:[...DEFAULTCOMPANYROLES, ...(customRoles.map((customRole)=>(customRole?.trim()?.replace(/\s+/g, '_')?.trim()?.toUpperCase())))]
    };
    //Company creation
    const company = new Company(companyObj);
    await company.save();
    const company_res = await Company.findById(company._id, {
       __v: 0,
    });
const companyCreatedByUser = await User.findById(company_res?.createdBy)

const userCompanies= ((companyCreatedByUser?.companies?.length > 0) ? (companyCreatedByUser?.companies?.map((company)=>{
if(company.companyID){
    return ({
      companyID:company?.companyID,
      companyRoles:['SUPER_ADMIN',...company?.companyRole],
      companyEmployee:{isCompanyEmployee:company?.companyEmployee?.isCompanyEmployee,jobPosition:company?.companyEmployee?.jobPosition}
    })
}
return ({
  companyID:company?.companyID,
  companyRoles:company?.companyRole,
  companyEmployee:{isCompanyEmployee:company?.companyEmployee?.isCompanyEmployee,jobPosition:company?.companyEmployee?.jobPosition}
})


})) : [{
  companyID:company_res?._id,
  companyRoles:['SUPER_ADMIN'],
  }
])
    await User.findByIdAndUpdate(company_res?.createdBy?._id,{companies:userCompanies})
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

    const payload = { ...req?.body };
    const originalRequest = {...req?.body}

    const updatedRequest = removeKeyValuePairsFromAnObject(originalRequest, [
      "companyID",
      "_id",
      "createdBy"
    ]);

    if (Object.keys(updatedRequest).length === 0) {
      return {
        body: {
          error_code: 404,
          error_message: "No Payload!",
        },
        status: { status: 404 },
      };
    }

    const customRoles = ((payload.companyRoles && payload.companyRoles.length > 0) ? payload.companyRoles : [] )



    const company_data = await Company.findOne({
      companyID: payload.companyID,
    });
    if (!company_data) {
      return {
        body: {
          error_code: 404,
          error_message: "Company Not Found!",
        },
        status: { status: 400 },
      };
    }

    


    const updatedCompany = await Company.findOneAndUpdate(
      { companyID: payload.companyID },
      
    removeNullValueFromAnObject({
          ...updatedRequest
                  ,companyEmployees: payload.companyEmployees
            ? (
                await findOrCreateUser(
                  payload.companyEmployees?.map((employee) => ({ worker: employee }))
                )
              ).map((employee) => employee?.worker) || null
            : null,
            companyGuards: payload.companyGuards
            ? (await findOrCreateUser(payload.companyGuards)) || null
            : null,
            comapnyStaff: payload.comapnyStaff
            ? (await findOrCreateUser(payload.comapnyStaff)) || null
            : null,
            companyRoles:[...DEFAULTCOMPANYROLES, ...(customRoles.map((customRole)=>(customRole?.trim()?.replace(/\s+/g, '_')?.trim()?.toUpperCase())))]

        })
      ,
      {
        new: true,
      }
    ).select(["-_id", "-__v"]);

    return { body: { updatedCompanyData:updatedCompany,priviousCompanyData:company_data }, status: { status: 200 } };
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

    if (Object.keys(req.body).length === 0) {
      return {
        body: {
          error_code: 404,
          error_message: "No Payload!",
        },
        status: { status: 404 },
      };
    }

    const { companyID } = req.body;
    const company = await Company.findOne({ companyID });
    if (!company) {
      return {
        body: {
          error_code: 404,
          error_message: "Company Not Found!",
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


// GET ALL Companies
export const getCompanies = async (req, res) => {
  try {
    const { skip, count, select } = req?.query;
    const start = parseInt(skip || 0);
    const end = (start + (parseInt(count && count <= 1000 ? count : 1000) ));
    const filteredByFields = select ? select.split(',') : [];
    

    let companies = await Company.find().populate("createdBy").lean().exec();
    const totalRecords = companies.length
    companies=companies.map((company) => 
    {

      const companyWithOutSensitiveValues = {
        createdBy: removeKeyValuePairsFromAnObject(company.createdBy, [
          "password",
        ]),
        ...company,
      }

      if(filteredByFields.length === 0){

return (companyWithOutSensitiveValues)
      }
     
      const filteredcompany = filterOBJwithKeys(company,filteredByFields) 
      if(Object.keys(filteredcompany).length === 0) {
        return null
      }




   return (filteredcompany)
  }
    );
    const page= companies.filter((company)=>(company !== null)).splice(start, end);

    return {
      body: {
        companies: page,
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