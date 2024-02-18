import User from "@/Models/User/User.js";
import dbConnect from "./connectDB";
import Company from "@/Models/Company/Company.js";

export const fetchCompanies = async (userName) => {
  dbConnect();
  let companyNames;
 const companies = (await User.findOne({ userName }).lean().exec()).companies
  Promise.all(companies.map(async (company) => {
      if (company) {
        return await Company.findById(company.companyID);
      }
    })
  ).then((res) => {
     
    companyNames = (res.filter((companyName) => companyName != null));
    console.log({companyNames})
  });
  return  (companyNames)
};
