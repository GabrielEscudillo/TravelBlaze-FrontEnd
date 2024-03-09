import { createSlice } from "@reduxjs/toolkit";

export const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: {
    id: null
  },
  reducers: {
    viewUserDetail: (state, action) => {
        return {
            id: action.payload
        }
    }
  },
});

export const { viewUserDetail } = userDetailSlice.actions;
export const userDetailId = (state) => state.userDetail;
export default userDetailSlice.reducer;