import { removeKeyValuePairsFromAnObject } from "@/Utils/removeKeyValuePairsFromAnObjectForArrayOfMongoDBIDForUser";
import Society from "../../Models/Society/Society";
import { findOrCreateUser } from "@/Utils/findOrCreateUser";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";
import SocietyRole from "@/Models/Role Models/Society_Role";

const DEFAULTSOCIETYROLES = ['OWNER', 'SUPER_ADMIN', 'ADMIN', 'OPERATOR', 'ANALYST', 'OUTTER_GUARD', 'INNER_GUARD', 'MAIN_GATE_GUARD', 'MAINTANCE_WORKER', 'TENENT', 'OWNER', 'SOCIETY_MEMBER', 'SOCIETY_CHAIRMAN', 'GUEST', 'MAID']

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
      societyRoles 
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

const customRoles = ((societyRoles && societyRoles.length > 0) ? societyRoles : [] )

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
      societyRoles:[...DEFAULTSOCIETYROLES, ...(customRoles.map((customRole)=>(customRole?.trim()?.replace(/\s+/g, '_')?.trim()?.toUpperCase())))]
    };

    //Society creation
    const society = new Society(societyObj);
    await society.save();
    const society_res = await Society.findById(society._id, { _id: 0, __v: 0 });
    return { body: society_res, status: { status: 201 } };
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

    const customRoles = ((payload.societyRoles && payload.societyRoles.length > 0) ? payload.societyRoles : [] )

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
          ...updatedRequest
                  ,societyMembers: payload.societyMembers
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
            societyRoles:[...DEFAULTSOCIETYROLES,...(customRoles.map((customRole)=>(customRole?.trim()?.replace(/\s+/g, '_')?.trim()?.toUpperCase())))]
        })

      ,
      {
        new: true,
      }
    ).select(["-_id", "-__v"]);

    return { body: { updatedSocietyData:updatedSociety,priviousSocietyData:society_data}, status: { status: 200 } };
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
    const societies = await Society.find();
    return { body: { societies }, status: { status: 200 } };
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
