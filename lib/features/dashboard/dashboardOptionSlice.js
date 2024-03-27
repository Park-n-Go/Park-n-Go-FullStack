
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyID: "", societyID: "" ,
  view: "" ,
  query:""
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
        if(typeof window !== "undefined"){

          localStorage.setItem("view",view)
        }
    },
    setQuery: (state, action) => {
      state.query = action.payload;
        
    },
  },
});

export const { setCompanyID, setSocietyID, switchView,setQuery } = dashboardOptionSlice.actions;
export default dashboardOptionSlice.reducer;
