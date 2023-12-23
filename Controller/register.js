import User from "../Models/User";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import Vehicle from "../Models/Vehicle";



//User Registration
export const registerUser = async (req, res) => {
  try {
    const user_data = req.body;
    const user_check = await User.findOne({ mobile: user_data.mobile });
    if (user_check) {
      if (
        user_check.email === user_data.email &&
        user_check.userName === user_data.userName
      ) {
        res
          .status(400)
          .json({ error_code: 400, error_message: "Stuff is already exist!" });
        return;
      }
      if (user_check.email === user_data.email) {
        res
          .status(400)
          .json({ error_code: 400, error_message: "Email is already exist!" });
        return;
      }
      if (user_check.userName === user_data.userName) {
        res.status(400).json({
          error_code: 400,
          error_message: "Username is already exist!",
        });
        return;
      }

      res.status(400).json({
        error_code: 400,
        error_message: "Mobile Number is already exist!",
      });
      return;
    }
    // const user_vehicles = await Vehicle.find({ mobile: user_data.mobile });
    // const stuff_company_ID = await Company.findOne(
    //   { companyName: user_data.companyName },
    //   { _id: 1 }
    // );
    //Hashing Password 
    // const hashPassword = bcrypt.hashSync(user_data.password, 10);

    //registring user
    const userObj = {
      uuid: user_data.id,
      firstName: user_data.firstName,
      lastName: user_data.lastName,
      email: user_data.email,
      mobile: user_data.mobile,
      userName: user_data.userName,
      password: hashPassword,
      // company_ID: stuff_company_ID._id,
      jobPosition: user_data?.jobPosition?.toUpperCase(),
      // vehicle_IDs: user_vehicles,
      role: user_data.role?.toUpperCase(),
    };
    const user = new User(userObj);
    await user.save();

    const user_res = await User.findById(user._id, {
      password: 0,
      __v: 0,
    });
    res.status(201).json(user_res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


