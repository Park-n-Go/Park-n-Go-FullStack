export const isUserAllowedToPerformRolesAndPermissionsCRUD = (
  user,
  payLoad,
  record
) => {
  const PNGROLES = process.env.BACKENDGATEWAYROLES;
  const PARKANDGOVENDORID = process.env.PARKANDGOVENDORID;
  if (payLoad.pngRole.vendorID === PARKANDGOVENDORID) {
    return (
      user.pngRoles.filter((pngRole) => PNGROLES.includes(pngRole)).length > 0
    );
  } else if (payLoad.pngRole.vendorType === "COMPANY") {
    return (
      user.companies.filter(
        (company) =>
          company.companyID === record.company._id &&
          company.companyRoles.filter((userCompanyRole) =>
            PNGROLES.includes(userCompanyRole)
          )
      ).length > 0
    );
  } else if (payLoad.pngRole.vendorType === "SOCIETY") {
    return (
      user.societies.filter(
        (society) =>
          society.societyID === record.society._id &&
          society.societyRoles.filter((userSocietyRole) =>
            PNGROLES.includes(userSocietyRole)
          )
      ).length > 0
    );
  } else {
    return false;
  }
};
