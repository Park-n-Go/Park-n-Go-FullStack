import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyID: "", societyID: "" ,
  view:"company"
};

export const dashboardOptionSlice = createSlice({
  name: "dashboardOptionSlice",
  initialState,
  reducers: {
    setCompanyID: (state, action) => {
        const companyID = action.payload;
        state.companyID = companyID;
    },setSocietyID: (state, action) => {
        const societyID = action.payload;
        state.societyID = societyID;
      },
    switchView: (state, action) => {
        const {view} = action.payload;
        state.view = view;
    },
  },
});

export const { setCompanyID, setSocietyID, switchView } = dashboardOptionSlice.actions;
export default dashboardOptionSlice.reducer;
