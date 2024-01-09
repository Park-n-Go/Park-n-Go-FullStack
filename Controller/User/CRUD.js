import User from "../../Models/User/User";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req, res) => {
  try {
    const user_data = req.body;
    console.log({user_data})
    const user_check = (await User.findOne({ userID: user_data?.id })) || (await User.findOne({email_addresses:user_data.email_addresses
    })) || (await User.findOne({phoneNumbers: user_data.phoneNumbers}))
    //Check if User is already present
    if (user_check) {
      if (
        user_check.email_addresses === user_data.email_addresses 
      ) {
        return {
          body: { error_code: 400, error_message: "User is already exist!" },
          status: { status: 400 },
        };
      }
      if (user_check.email_addresses === user_data.email_addresses) {
        return {
          body: { error_code: 400, error_message: "Email is already exist!" },
          status: { status: 400 },
        };
      }
      if (
        user_data?.phone_numbers
          ?.map((phoneNumberObj) => phoneNumberObj?.phone_number)
          .filter((pNum) => user_check?.phoneNumbers?.includes(pNum))?.length >
        1
      ) {
        return {
          body: {
            error_code: 400,
            error_message: "Mobie Number is already exist!",
          },
          status: { status: 400 },
        };
      }

      return {
        body: {
          error_code: 400,
          error_message: "User is already exist!",
        },
        status: { status: 400 },
      };
    }
    if (
      (!user_data.email_addresses || !user_data.phoneNumbers) &&
      (!Array.isArray(user_data.email_addresses) ||
        !Array.isArray(user_data.phoneNumbers))
    ) {
      throw Error("Array of Email or Phone Number is required");
    }

    const userObj = {
      userID: user_data?.id || user_data?.userID || uuidv4(),
      firstName: user_data.first_name || user_data.firstName || null,
      lastName: user_data.last_name || user_data.lastName || null,
      email_addresses: user_data.email_addresses
        ? user_data.email_addresses?.map(
            (email_addressesObj) => {if(email_addressesObj?.email_address) { return (email_addressesObj?.email_address)} return (email_addressesObj)}
          ) 
        : [],
      phoneNumbers: (user_data.phone_numbers
        ? user_data?.phone_numbers?.map(
            (phoneNumberObj) => phoneNumberObj?.phone_number          
          ) 
        : user_data?.phoneNumbers) || [],
      // company_ID: stuff_company_ID._id,
      jobPosition: user_data?.jobPosition?.toUpperCase() || null,
      // vehicle_IDs: user_vehicles,
      role: user_data.role?.toUpperCase() || 'User',
    };

    //User creation
    const user = new User(userObj);
    await user.save();
    const user_res = await User.findById(user._id, {
      password: 0,
      __v: 0,
    });
    return { body: user_res, status: { status: 201 } };
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
    const user_data = req.body;
    const user = await User.findOne({ userID: user_data.userID });
    if (!user) {
      return {
        body: {
          error_code: 404,
          error_message: "User Not Found",
        },
        status: { status: 400 },
      };
    }

    const userObj = {
      firstName: user_data.first_name,
      lastName: user_data.last_name,
      email_addresses:
        user.email_addresses.length > 0
          ? [
              ...new Set([
                ...user.email_addresses,
                ...user_data.email_addresses?.map(
                  (email_addressesObj) => email_addressesObj?.email_address
                ),
              ]),
            ]
          : user_data.email_addresses?.map(
              (email_addressesObj) => email_addressesObj?.email_address
            ),
      phoneNumbers:
        user.phoneNumbers.length > 0
          ? [
              ...new Set([
                ...user.phoneNumbers,
                ...user_data?.phone_numbers?.map(
                  (phoneNumberObj) => phoneNumberObj?.phone_number
                ),
              ]),
            ]
          : user_data?.phone_numbers?.map(
              (phoneNumberObj) => phoneNumberObj?.phone_number
            ),
      // company_ID: stuff_company_ID._id,
      jobPosition: user_data?.jobPosition?.toUpperCase(),
      // vehicle_IDs: user_vehicles,
      role: user_data.role?.toUpperCase() || "user",
    };
    const updatedUser = await User.findOneAndUpdate(
      { userID: user.userID },
      userObj,
      {
        new: true,
      }
    );

    return { body: { updatedUser }, status: { status: 200 } };
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
    const user_data = req.body;
    const user = await User.findOne({ userID: user_data.userID });
    if (!user) {
      return {
        body: {
          error_code: 404,
          error_message: "User Not Found",
        },
        status: { status: 400 },
      };
    }
   await User.findByIdAndDelete(user._id);
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
