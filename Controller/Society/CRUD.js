import { removeKeyValuePairsFromAnObject } from "@/Utils/removeKeyValuePairsFromAnObject";
import Society from "../../Models/Society/Society";
import { findOrCreateUser } from "@/Utils/findOrCreateUser";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";
import { filterOBJwithKeys } from "@/Utils/filterOBJwithKeys";

import User from "@/Models/User/User";
import { chunkify } from "@/Utils/chunkify";
import { createPNGRolesAndPermissions } from "../PNG/RolesAndPermissions/CRUD";


export const createSociety = async (req, res) => {
  try {
    const {
      societyName,
      societyEntrancePicture,
      officePhoneNumbers,
      builderName,
      builderOfficeAddress,
      societyAddress,
      flates,
      societyMembers,
      societyStaffs,
      societyGuards,
      projectReraNumber,
      createdBy,
      societyRoles,
    } = req.body;
    const societyID =
      societyName.replace(/\s/g, "").toLowerCase() + officePhoneNumbers[0];
    const society_check = await Society.findOne({ societyID });
    //Check if Society is already present

    if (society_check) {
      return {
        body: {
          error_code: 400,
          error_message: "Society is already exist!",
        },
        status: { status: 400 },
      };
    }

    const customRoles =
      societyRoles && societyRoles.length > 0 ? societyRoles : [];

    const societyObj = {
      societyID,
      societyName,
      societyEntrancePicture,
      officePhoneNumbers,
      builderName,
      builderOfficeAddress,
      societyAddress,
      flates,
      societyMembers: societyMembers
        ? (
            await findOrCreateUser(
              societyMembers.map((member) => ({ worker: member }))
            )
          ).map((member) => member?.worker) || []
        : [],
      societyGuards: societyGuards
        ? (await findOrCreateUser(societyGuards)) || []
        : [],
      societyStaffs: societyStaffs
        ? (await findOrCreateUser(societyStaffs)) || []
        : [],
      projectReraNumber,
      createdBy: createdBy ? (await findOrCreateUser(createdBy)) || null : null,
    };

    //Society creation
    const society = new Society(societyObj);
    await society.save();
    const society_res = await Society.findById(society._id, {__v: 0 });

    const societyCreatedByUser = await User.findById(society_res?.createdBy)
    const userSocieties= [...societyCreatedByUser?.societies,{
      societyID:society_res?._id,
      societyRoles:["SUPER_ADMIN"],
      }
    ] 
          await User.findByIdAndUpdate(society_res?.createdBy?._id,{societies:userSocieties});

    //Society Default Roles Creation
     
    await createPNGRolesAndPermissions({body:{
      userName: process.env.MASTERUSERNAME,
      password: process.env.MASTERUSERPASSWORD,
      pngRole: {
          vendorID: society_res.societyID,
          vendorType: "SOCIETY",
          vendorRoles: [
              {
                  category: "OFFICE",
                  role: "OFFICE_MANAGER",
                  permission: "ALL_PERMISSION"
              }
          ]
      }
  }})
  
  const societyRoleUpdated = await Society.findById(society_res._id)



    return { body: societyRoleUpdated, status: { status: 201 } };
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

// Society updataion
export const updateSociety = async (req, res) => {
  try {
    const payload = { ...req?.body };
    const originalRequest = { ...payload };

    const updatedRequest = removeKeyValuePairsFromAnObject(originalRequest, [
      "societyID",
      "_id",
      "createdBy",
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

    const customRoles =
      payload.societyRoles && payload.societyRoles.length > 0
        ? payload.societyRoles
        : [];

    const society_data = await Society.findOne({
      societyID: payload.societyID,
    });
    if (!society_data) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found!",
        },
        status: { status: 404 },
      };
    }

    const updatedSociety = await Society.findOneAndUpdate(
      { societyID: payload?.societyID },

      removeNullValueFromAnObject({
        ...updatedRequest,
        societyMembers: payload.societyMembers
          ? (
              await findOrCreateUser(
                payload.societyMembers.map((member) => ({ worker: member }))
              )
            ).map((member) => member?.worker) || null
          : null,
        societyGuards: payload.societyGuards
          ? (await findOrCreateUser(payload.societyGuards)) || null
          : null,
        societyStaffs: payload.societyStaffs
          ? (await findOrCreateUser(payload.societyStaffs)) || null
          : null,
        societyRoles: [
          ...DEFAULTSOCIETYROLES,
          ...customRoles.map((customRole) =>
            customRole?.trim()?.replace(/\s+/g, "_")?.trim()?.toUpperCase()
          ),
        ],
      }),

      {
        new: true,
      }
    ).select(["-_id", "-__v"]);

    return {
      body: {
        updatedSocietyData: updatedSociety,
        priviousSocietyData: society_data,
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

// Society deletion
export const deleteSociety = async (req, res) => {
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

    const { societyID } = req.body;
    const society = await Society.findOne({ societyID });
    if (!society) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found!",
        },
        status: { status: 400 },
      };
    }
    await Society.findByIdAndDelete(society._id);
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

// GET ALL Society
export const getSocieties = async (req, res) => {
  try {
    const { skip, count,select } = req?.query;

    const start = parseInt(skip || 0);
    const end = (start + (parseInt(count && count <= 1000 ? count : 1000) ));
    const filteredByFields = select ? select.split(',') : [];
   

    let societies = await Society.find().populate("createdBy").lean().exec();
    const totalRecords = societies.length
    societies = societies.map((society) => 
    {

      const socityWithOutSensitiveValues = {
        createdBy: removeKeyValuePairsFromAnObject(society.createdBy, [
          "password",
        ]),
        ...society,
      }

      if(filteredByFields.length === 0){

return (socityWithOutSensitiveValues)
      }
     
      const filteredSociety = filterOBJwithKeys(society,filteredByFields) 
      if(Object.keys(filteredSociety).length === 0) {
        return null
      }

   return (filteredSociety)
  }
    );
    const page = chunkify(societies,start,end);

    return {
      body: {
        societies: page,
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


// GET Society By societyID
export const getSocietyByID = async (req, res) => {
  try {
    const { params } = req;
    const {societyID} = params
    

    const society = await Society.findOne({societyID}).populate("createdBy").exec();
    if(!society){
      return {
        body: {
          error_code: 404,
          error_message: 'Scoiety is Not Found!',
        },
        status: { status: 404 },
      };
    }

    return {
      body: {
        society
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
