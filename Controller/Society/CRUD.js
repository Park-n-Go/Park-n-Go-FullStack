import Society from "../../Models/Society/Society";

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
    } = req.body;
    const society_check = await Society.findOne({ projectReraNumber });
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
    };

    //Society creation
    const society = new Society(societyObj);
    await society.save();
    const society_res = await Society.findById(society._id, {_id:0,
      __v: 0,
    });
    return { body: society_res, status: { status: 201 } };
  } catch (error) {
    return {
      body: {
        error_code: 400,
        error_message: error,
      },
      status: { status: 400 },
    };
  }
};

// Society updataion
export const updateSociety = async (req, res) => {
  try {
    const society_data = await Society.findById(req.body.id);
    if (!society_data) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found",
        },
        status: { status: 400 },
      };
    }

    const { id, projectReraNumber, ...reqDataWithOutReraNumber } = req.body;

    //merging two objects
    const societyObj = Object.assign({}, reqDataWithOutReraNumber, {
      projectReraNumber: society_data?.projectReraNumber
        ? society_data.projectReraNumber
        : req?.body?.projectReraNumber,
    });

    const updatedSociety = await Society.findByIdAndUpdate(id, societyObj, {
      new: true
    }).select(['-_id','-__v'])    ;


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
    const society_data = req.body;
    const society = await Society.findById(society_data.societyID);
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
