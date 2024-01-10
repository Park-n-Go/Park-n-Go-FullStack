import User from "@/Models/User/User";
import { createUser } from "@/Controller/User/CRUD";

export const findOrCreateUser = async (userData) => {
  try {
    if (Array.isArray(userData)) {
      //Check input for array
      // Below we return array of user ids
      const findUser = Promise.all(
        userData.map(async (singleUserData) => {
          const jobCategory = singleUserData?.jobCategory;
          const jobPosition = singleUserData?.jobPosition;
          const providerName = singleUserData?.providerName;
          const user =
            (await User.findOne({ userID: singleUserData?.worker?.userID })) ||
            (await User.findOne({
              email_addresses: singleUserData?.worker?.email_addresses,
            })) ||
            (await User.findOne({
              phoneNumbers: singleUserData?.worker?.phoneNumbers,
            }));
          if (user) {
            return { worker: user, jobCategory, jobPosition, providerName };
          } else {
            const result = await createUser({ body: singleUserData?.worker });
            return {
              worker: result?.body,
              jobCategory,
              jobPosition,
              providerName,
            };
          }
        })
      );
      return await findUser;
    }

    //Below we return only single user id as string
    const user =
      (await User.findOne({ userID: userData?.userID })) ||
      (await User.findOne({ email_addresses: userData?.email_addresses })) ||
      (await User.findOne({ phoneNumbers: userData?.phoneNumbers }));

    if (!(await user)) {
      const result = await createUser({ body: userData });
      return result?.body;
    }
    return await user;
  } catch (error) {
    return error.message;
  }
};
