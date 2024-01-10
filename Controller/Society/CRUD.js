import { removeKeyValuePairsFromAnObject } from "@/Utils/removeKeyValuePairsFromAnObject";
import Society from "../../Models/Society/Society";
import { findOrCreateUser } from "@/Utils/findOrCreateUser";

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

    const society_data = await Society.findOne({
      societyID: payload.societyID,
    });
    if (!society_data) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found",
        },
        status: { status: 404 },
      };
    }

    const updatedSociety = await Society.findOneAndUpdate(
      { societyID: payload?.societyID },
      updatedRequest,
      {
        new: true,
      }
    ).select(["-_id", "-__v"]);

    return { body: { updatedSociety }, status: { status: 200 } };
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
    const { societyID } = req.body;
    const society = await Society.findOne({ societyID });
    if (!society) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found",
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
