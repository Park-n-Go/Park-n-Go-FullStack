import { removeKeyValuePairsFromAnObject } from "@/Utils/removeKeyValuePairsFromAnObjectForArrayOfMongoDBIDForUser";
import Company from "../../Models/Company/Company";
import { findOrCreateUser } from "@/Utils/findOrCreateUser";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";

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
      comapnyStaff: comapnyStaff
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
    };
    //Company creation
    const company = new Company(companyObj);
    await company.save();
    const company_res = await Company.findById(company._id, {
      _id: 0,
      __v: 0,
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
