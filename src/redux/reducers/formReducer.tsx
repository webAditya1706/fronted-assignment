import { UserData } from "@/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  userData: UserData[];
  loginUser: any
}

const initialState: UserState = {
  userData: [],
  loginUser: {

  }
};

const createuserSlice = createSlice({
  name: "user/createUser",
  initialState: initialState,
  reducers: {
    userData: (state, action: PayloadAction<UserData>) => {
      state.userData = [...state.userData, action.payload];
    },
    deleteUser: (state, action) => {
      let updatedData = JSON.parse(JSON.stringify(state.userData)).filter(
        (_: UserData, index: number) => index != action.payload
      );
      state.userData = updatedData;
    },
    UpdateUserReducer: (state, action) => {      
      state.loginUser.loginUserData = action.payload
    },
    LoginReducer: (state, action) => {
      // const loginUserData = { ...action.payload }
      state.loginUser = action.payload
    },
    LogoutReducer: (state, action) => {
      state.loginUser = {}
    }
  },
});

export const { userData, deleteUser, UpdateUserReducer, LoginReducer, LogoutReducer } = createuserSlice.actions;

export default createuserSlice.reducer;
