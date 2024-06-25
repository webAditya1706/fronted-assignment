import { LoginUserInterFace, UserData } from "@/types/user";
import axiosInstance from "@/utils/interSeptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LoginReducer, UpdateUser, deleteUser } from "../reducers/formReducer";

const createUserAction = createAsyncThunk(
  "form/createUser",
  async (body: any, thunkApi) => {
    axiosInstance
      .post("/user/ragister", body)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
);

const delateUserAction = createAsyncThunk(
  "form/delateUserAction",
  async (id: number, thunkApi) => {
    thunkApi.dispatch(deleteUser(id));
  }
);
const updateUserAction = createAsyncThunk(
  "form/updateUserAction",
  async (body: any, thunkApi) => {
    axiosInstance
      .patch("/user/updateUser", body)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err.response,"=========errr");
        
        toast.error(err?.response?.data?.message);
      });
  }
);
const LoginUserAction = createAsyncThunk(
  "user/login",
  async (body: LoginUserInterFace, thunkApi) => {
    axiosInstance
      .post("/user/login", body)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data) {
          localStorage.setItem("assignToken", res.data.data.token)

          thunkApi.dispatch(LoginReducer(res.data.data))
        }
      })
      .catch((err) => {
        console.log(err);

        // toast.error(err.response.data.message);
      });
  }
);

export {
  LoginUserAction,
  createUserAction,
  delateUserAction,
  updateUserAction,
};
