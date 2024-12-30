import { createSlice } from "@reduxjs/toolkit";
import { ourMission } from "./contentConstants";
// Content constants

const initialState = {
  content: ourMission,
  selectedButton: "first",
};

const toggleSlice = createSlice({
  name: "toggler",
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload.content;
      state.selectedButton = action.payload.button;
    },
  },
});

export const { setContent } = toggleSlice.actions;
export default toggleSlice.reducer;
