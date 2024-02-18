import User from "../../../Models/User/User.js";
import bcrypt from "bcrypt";
import RolesAndPermissions from "@/Models/RolesAndPermissions/RolesAndPermissions.js";
import Company from "@/Models/Company/Company.js";
import Society from "@/Models/Society/Society.js";
import { isUserAllowedToPerformRolesAndPermissionsCRUD } from "@/Utils/isUserAllowedToPerformRolesAndPermissionsCRUD.js";

const PARKANDGO = process.env.PARKANDGO;
const PARKANDGOVENDORID = process.env.PARKANDGOVENDORID;

const DEFAULTPARKANDGOROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "OWNER",
  "OPERATOR",
  "ANALYST",
  "EMPLOYEE",
];
const DEFAULTCOMPANYROLES = [
  "OWNER",
  "SUPER_ADMIN",
  "ADMIN",
  "OPERATOR",
  "ANALYST",
  "OUTTER_GUARD",
  "INNER_GUARD",
  "MAIN_GATE_GUARD",
  "MAINTANCE_WORKER",
  "EMPLOYEE",
  "VISITOR",
  "CLIENT",
  "GUEST",
];
const DEFAULTSOCIETYROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "OPERATOR",
  "ANALYST",
  "OUTTER_GUARD",
  "INNER_GUARD",
  "MAIN_GATE_GUARD",
  "MAINTANCE_WORKER",
  "TENENT",
  "OWNER",
  "SOCIETY_MEMBER",
  "SOCIETY_CHAIRMAN",
  "GUEST",
  "MAID",
];

// Roles and Permissions creation
export const createPNGRolesAndPermissions = async (req, res) => {
  try {
    const payLoad = req?.body;

    //Check if User is already present
    if ((!payLoad?.userName && !payLoad?.userID) || !payLoad?.password) {
      return { body: "Credentials missing!", status: { status: 400 } };
    }

    if (!payLoad?.pngRole || Object.keys(payLoad?.pngRole).length === 0) {
      return { body: "pngRoles is missing!", status: { status: 400 } };
    }

    if (!payLoad.pngRole.vendorID) {
      return { body: "VendorID is missing!", status: { status: 400 } };
    }

    const user =
      (await User.findOne({ userID: payLoad?.id })) ||
      (await User.findOne({ email_addresses: payLoad?.email_addresses })) ||
      (await User.findOne({ phoneNumbers: payLoad?.phoneNumbers })) ||
      (await User.findOne({ userName: payLoad?.userName }));
    if (!user) {
      return { body: "User Not Found!", status: { status: 400 } };
    }

    if (!bcrypt.compareSync(payLoad?.password, user?.password)) {
      return { body: "Wrong Credentials!", status: { status: 400 } };
    }
    let record = {};
    if (payLoad.pngRole.vendorID === PARKANDGOVENDORID) {
      record["PNG"] = PARKANDGO;
    } else if (payLoad.pngRole.vendorType === "COMPANY") {
      record["company"] = await Company.findOne({
        companyID: payLoad.pngRole.vendorID,
      });
    } else if (payLoad.pngRole.vendorType === "SOCIETY") {
      record["society"] = await Society.findOne({
        societyID: payLoad.pngRole.vendorID,
      });
    } else {
      return { body: "Invalid Vendor Type!", status: { status: 400 } };
    }

    if (!record.PNG && !record.company && !record.society) {
      return { body: "Vendor is not onboarded yet!", status: { status: 400 } };
    }

    const rolesAndPermissions_Check = await RolesAndPermissions.findOne({
      vendorID: payLoad.pngRole.vendorID,
    });
    if (rolesAndPermissions_Check) {
      return {
        body: "Vendor is already have Role and Permission sets!",
        status: { status: 400 },
      };
    }
    const isUserAllowed = isUserAllowedToPerformRolesAndPermissionsCRUD(
      user,
      payLoad,
      record
    );

    if (isUserAllowed) {
      return { body: "Forbidden request!", status: { status: 403 } };
    }

    let pngRolesOBJ;

    if (payLoad.pngRole.vendorID === PARKANDGOVENDORID) {
      pngRolesOBJ = {
        vendor: PARKANDGO,
        vendorID: PARKANDGOVENDORID,
        vendorType: "COMPANY",
        vendorRoles: [
          ...DEFAULTPARKANDGOROLES.map((DEFAULTPARKANDGOROLE) => {
            return {
              role: DEFAULTPARKANDGOROLE,
              category: "DEFAULT",
              permission: "DEFAULT",
            };
          }),
          ...payLoad.pngRole.vendorRoles.filter(
            (vendorRole) => !DEFAULTPARKANDGOROLES.includes(vendorRole?.role)
          ),
        ],
      };
    } else if (payLoad.pngRole.vendorType === "COMPANY") {
      pngRolesOBJ = {
        vendor: record.company.companyName,
        vendorID: record.company.companyID,
        vendorType: "COMPANY",
        vendorRoles: [
          ...DEFAULTCOMPANYROLES.map((DEFAULTCOMPANYROLE) => {
            return {
              role: DEFAULTCOMPANYROLE,
              category: "DEFAULT",
              permission: "DEFAULT",
            };
          }),
          ...payLoad.pngRole.vendorRoles.filter(
            (vendorRole) => !DEFAULTCOMPANYROLES.includes(vendorRole?.role)
          ),
        ],
      };
    } else if (payLoad.pngRole.vendorType === "SOCIETY") {
      pngRolesOBJ = {
        vendor: record.society.societyName,
        vendorID: record.society.societyID,
        vendorType: "SOCIETY",
        vendorRoles: [
          ...DEFAULTSOCIETYROLES.map((DEFAULTSOCIETYROLE) => {
            return {
              role: DEFAULTSOCIETYROLE,
              category: "DEFAULT",
              permission: "DEFAULT",
            };
          }),
          ...payLoad.pngRole.vendorRoles.filter(
            (vendorRole) => !DEFAULTSOCIETYROLES.includes(vendorRole?.role)
          ),
        ],
      };
    }

    const pngRoles = new RolesAndPermissions(pngRolesOBJ);
    await pngRoles.save();
    if (record.company) {
      await Company.findByIdAndUpdate(record.company._id, {
        companyRoles: pngRoles.vendorRoles.map((vendorRole) => vendorRole.role),
      });
    } else if (record.society) {
      await Society.findByIdAndUpdate(record.society._id, {
        societyRoles: pngRoles.vendorRoles.map((vendorRole) => vendorRole.role),
      });
    }
    return { body: pngRoles, status: { status: 201 } };
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

// Roles and Permissions updataion
export const updatePNGRolesAndPermissions = async (req, res) => {
  try {
    const payLoad = req?.body;

    //Check if User is already present
    if ((!payLoad?.userName && !payLoad?.userID) || !payLoad?.password) {
      return { body: "Credentials missing!", status: { status: 400 } };
    }

    if (!payLoad?.pngRole || Object.keys(payLoad?.pngRole).length === 0) {
      return { body: "pngRoles is missing!", status: { status: 400 } };
    }

    if (!payLoad.pngRole.vendorID) {
      return { body: "VendorID is missing!", status: { status: 400 } };
    }

    const user =
      (await User.findOne({ userID: payLoad?.id })) ||
      (await User.findOne({ email_addresses: payLoad?.email_addresses })) ||
      (await User.findOne({ phoneNumbers: payLoad?.phoneNumbers })) ||
      (await User.findOne({ userName: payLoad?.userName }));
    if (!user) {
      return { body: "User Not Found!", status: { status: 400 } };
    }

    if (!bcrypt.compareSync(payLoad?.password, user?.password)) {
      return { body: "Wrong Credentials!", status: { status: 400 } };
    }
    let record = {};
    if (payLoad.pngRole.vendorID === PARKANDGOVENDORID) {
      record["PNG"] = PARKANDGO;
    } else if (payLoad.pngRole.vendorType === "COMPANY") {
      record["company"] = await Company.findOne({
        companyID: payLoad.pngRole.vendorID,
      });
    } else if (payLoad.pngRole.vendorType === "SOCIETY") {
      record["society"] = await Society.findOne({
        societyID: payLoad.pngRole.vendorID,
      });
    } else {
      return { body: "Invalid Vendor Type!", status: { status: 400 } };
    }

    if (!record.PNG && !record.company && !record.society) {
      return { body: "Vendor is not onboarded yet!", status: { status: 400 } };
    }

    const rolesAndPermissions_Check = await RolesAndPermissions.findOne({
      vendorID: payLoad.pngRole.vendorID,
    });
    if (!rolesAndPermissions_Check) {
      return {
        body: "Vendor is does not have Role and Permission sets!",
        status: { status: 404 },
      };
    }
    const isUserAllowed = isUserAllowedToPerformRolesAndPermissionsCRUD(
      user,
      payLoad,
      record
    );

    if (isUserAllowed) {
      return { body: "Forbidden request!", status: { status: 403 } };
    }

    let pngRolesOBJ;

    if (payLoad.pngRole.vendorID === PARKANDGOVENDORID) {
      pngRolesOBJ = {
        vendor: PARKANDGO,
        vendorType: "COMPANY",
        vendorRoles: [
          ...DEFAULTPARKANDGOROLES.map((DEFAULTPARKANDGOROLE) => {
            return {
              role: DEFAULTPARKANDGOROLE,
              category: "DEFAULT",
              permission: "DEFAULT",
            };
          }),
          ...payLoad.pngRole.vendorRoles.filter(
            (vendorRole) => !DEFAULTPARKANDGOROLES.includes(vendorRole?.role)
          ),
        ],
      };
    } else if (payLoad.pngRole.vendorType === "COMPANY") {
      pngRolesOBJ = {
        vendor: record.company.companyName,
        vendorType: "COMPANY",
        vendorRoles: [
          ...DEFAULTCOMPANYROLES.map((DEFAULTCOMPANYROLE) => {
            return {
              role: DEFAULTCOMPANYROLE,
              category: "DEFAULT",
              permission: "DEFAULT",
            };
          }),
          ...payLoad.pngRole.vendorRoles.filter(
            (vendorRole) => !DEFAULTCOMPANYROLES.includes(vendorRole?.role)
          ),
        ],
      };
    } else if (payLoad.pngRole.vendorType === "SOCIETY") {
      pngRolesOBJ = {
        vendor: record.society.societyName,
        vendorType: "SOCIETY",
        vendorRoles: [
          ...DEFAULTSOCIETYROLES.map((DEFAULTSOCIETYROLE) => {
            return {
              role: DEFAULTSOCIETYROLE,
              category: "DEFAULT",
              permission: "DEFAULT",
            };
          }),
          ...payLoad.pngRole.vendorRoles.filter(
            (vendorRole) => !DEFAULTSOCIETYROLES.includes(vendorRole?.role)
          ),
        ],
      };
    }

    const pngRoles = await RolesAndPermissions.findOneAndUpdate(
      { vendorID: payLoad?.pngRole?.vendorID },
      pngRolesOBJ,
      { new: true }
    );
    if (record.company) {
      await Company.findByIdAndUpdate(record.company._id, {
        companyRoles: pngRoles.vendorRoles.map((vendorRole) => vendorRole.role),
      });
    } else if (record.society) {
      await Society.findByIdAndUpdate(record.society._id, {
        societyRoles: pngRoles.vendorRoles.map((vendorRole) => vendorRole.role),
      });
    }
    return { body: pngRoles, status: { status: 201 } };
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