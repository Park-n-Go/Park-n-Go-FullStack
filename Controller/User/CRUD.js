import User from "../../Models/User/User";
import { v4 as uuidv4 } from "uuid";
import { removeNullValueFromAnObject } from "@/Utils/removeNullValueFromAnObject";

export const createUser = async (req, res) => {
  try {
    const user_data = req?.body;
    const user_check = (await User.findOne({ userID: user_data?.id })) || (await User.findOne({email_addresses:user_data?.email_addresses
    })) || (await User.findOne({phoneNumbers: user_data?.phoneNumbers}))
    //Check if User is already present
    if (user_check) {
      if (
        user_check?.email_addresses === user_data?.email_addresses 
      ) {
        return {
          body: { error_code: 400, error_message: "User is already exist!" },
          status: { status: 400 },
        };
      }
      if (user_check?.email_addresses === user_data?.email_addresses) {
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
      (!user_data?.email_addresses || !user_data?.phoneNumbers) &&
      (!Array.isArray(user_data?.email_addresses) ||
        !Array.isArray(user_data?.phoneNumbers))
    ) {
      throw Error("Array of Email or Phone Number is required");
    }

    const userObj = {
      userID: user_data?.id || user_data?.userID || uuidv4(),
      userName:user_data?.userName || (user_data?.firstName.slice(0,1)+user_data?.lastName) || null,
      firstName: user_data?.first_name || user_data?.firstName || null,
      lastName: user_data?.last_name || user_data?.lastName || null,
      email_addresses: user_data?.email_addresses
        ? user_data?.email_addresses?.map(
            (email_addressesObj) => {if(email_addressesObj?.email_address) { return (email_addressesObj?.email_address)} return (email_addressesObj)}
          ) 
        : [],
      phoneNumbers: (user_data?.phone_numbers
        ? user_data?.phone_numbers?.map(
            (phoneNumberObj) => phoneNumberObj?.phone_number          
          ) 
        : user_data?.phoneNumbers) || [],
        companies: user_data?.company,
        vehicleIDs: user_data?.vehicleIDs,
        profilePicture: user_data?.profilePicture,
        userAddress:user_data?.userAddress,
        societies:user_data?.society,
        password:user_data?.password,
        
        pngRole: user_data?.pngRole?.toUpperCase() || 'User',
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
          company: payload?.company || null,
      vehicleIDs: payload?.vehicleIDs || null,
      pngRole: payload?.pngRole || null,
      societies:payload?.societies || null,
      companies:payload?.companies || null,
      userAddress:payload?.userAddress || null,
      profilePicture:payload?.profilePicture || null,
      userAddress:payload?.userAddress || null,
      userName: payload?.userName || null

    });
    const updatedUser = await User.findOneAndUpdate(
      { userID: user_data.userID },
      userObj,
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
