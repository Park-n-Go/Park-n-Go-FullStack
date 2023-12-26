import User from "../../Models/User/User";

export const createUser = async (req, res) => {
  try {
    const user_data = req.body;
    const user_check = await User.findOne({ uuid: user_data.id });
    //Check if User is already present
    if (user_check) {
      if (
        user_check.email === user_data.email &&
        user_check.userName === user_data.userName
      ) {
        return {
          body: { error_code: 400, error_message: "Stuff is already exist!" },
          status: { status: 400 },
        };
      }
      if (user_check.email === user_data.email) {
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

    const userObj = {
      uuid: user_data.id,
      firstName: user_data.first_name || null,
      lastName: user_data.last_name || null,
      email_addresses: user_data.email_addresses
        ? user_data.email_addresses?.map(
            (email_addressesObj) => email_addressesObj?.email_address
          )
        : [],
      phoneNumbers: user_data.phone_numbers
        ? user_data?.phone_numbers?.map(
            (phoneNumberObj) => phoneNumberObj?.phone_number
          )
        : [],
      // company_ID: stuff_company_ID._id,
      jobPosition: user_data?.jobPosition?.toUpperCase() || null,
      // vehicle_IDs: user_vehicles,
      role: user_data.role?.toUpperCase() || null,
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
        error_message: error,
      },
      status: { status: 400 },
    };
  }
};

// User updataion
export const updateUser = async (req, res) => {
  try {
    const user_data = req.body;
    const user = await User.findOne({ uuid: user_data.id });
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
    console.log({ userObj });
    const updatedUser = await User.findOneAndUpdate(
      { uuid: user.uuid },
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
    const user = await User.findOne({ uuid: user_data.id });
    if (!user) {
      return {
        body: {
          error_code: 404,
          error_message: "User Not Found",
        },
        status: { status: 400 },
      };
    }
    const deletedUser = await User.findOneAndDelete({ uuid: user.uuid });
    return { body: { user: deletedUser }, status: { status: 200 } };
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
