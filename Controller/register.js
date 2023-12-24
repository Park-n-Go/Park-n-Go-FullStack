import User from "../Models/User";
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
// import Vehicle from "../Models/Vehicle";



//User Registration
export const registerUser = async (req, res) => {
  try {

    const user_data = req.body;
console.log({user_data})
    const user_check = await User.findOne({ uuid: user_data.id });

    if (user_check) {
      if (
        user_check.email === user_data.email &&
        user_check.userName === user_data.userName
      ) {

        return ({body:{ error_code: 400, error_message: "Stuff is already exist!" },status: { status: 400 }})
      }
      if (user_check.email === user_data.email) {

        return ({body:{ error_code: 400, error_message: "Email is already exist!" },status: { status: 400 }})
      }
      if (user_data?.phone_numbers?.map(phoneNumberObj=> phoneNumberObj?.phone_number).filter(pNum => user_check?.phoneNumbers?.includes(pNum))?.length > 1) {

        return ({body:{
          error_code: 400,
          error_message: "Mobie Number is already exist!",
        },status: {status: 400 }})
      }


      return ({body:{
        error_code: 400,
        error_message: "User is already exist!",
      },status: { status: 400 }})
    }
    // const user_vehicles = await Vehicle.find({ mobile: user_data.mobile });
    // const stuff_company_ID = await Company.findOne(
    //   { companyName: user_data.companyName },
    //   { _id: 1 }
    // );
    // Hashing Password 
    const hashPassword = (user_data.source === "clerk" ? null : bcrypt.hashSync(user_data.password, 10));

    //registring user
   
  
    const userObj = {
      uuid: user_data.id,
      firstName: user_data.first_name || null,
      lastName: user_data.last_name || null,
      email_addresses: user_data.email_addresses || null,
      phoneNumbers: user_data.phone_numbers ? user_data?.phone_numbers?.map(phoneNumberObj=> phoneNumberObj?.phone_number) : [],
      userName: user_data.userName || null,
      password: hashPassword || null,
      // company_ID: stuff_company_ID._id,
      jobPosition: user_data?.jobPosition?.toUpperCase() || null,
      // vehicle_IDs: user_vehicles,
      role: user_data.role?.toUpperCase() || null,
    };
    const user = new User(userObj);
    await user.save();
    console.log(user);
    const user_res = await User.findById(user._id, {
      password: 0,
      __v: 0,
    });
    return ({ body: user_res , status: { status: 201 }})
  } catch (error) {
    return (`error message: ${error.message}`, { status: 400 })
  }
};


