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
      projectReraNumber
  }
    
     = req.body;
    const society_check = await Society.findOne({projectReraNumber});
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
      projectReraNumber
  };

    //Society creation
    const society = new Society(societyObj);
    await society.save();
    const society_res = await Society.findById(society._id, {
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
    
     const society_data = await Society.findById(req.body._id)
    if (!society_data) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found",
        },
        status: { status: 400 },
      };
    }
    

    const {_id,projectReraNumber,...reqDataWithOutReraNumber }=req.body

    //merging two objects
    const societyObj = Object.assign({},reqDataWithOutReraNumber, {projectReraNumber: society_data?.projectReraNumber ? society_data.projectReraNumber : req?.body?.projectReraNumber,
      }) 
      
    const updatedSociety = await Society.findByIdAndUpdate(_id,societyObj,{new: true,});
   
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
export const deleteUser = async (req, res) => {
  try {
    const society_data = req.body;
    const society = await Society.findOne({ uuid: society_data.id });
    if (!society) {
      return {
        body: {
          error_code: 404,
          error_message: "Society Not Found",
        },
        status: { status: 400 },
      };
    }
    const deletedUser = await Society.findOneAndDelete({ uuid: society.uuid });
    return { body: { society: deletedUser }, status: { status: 200 } };
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



