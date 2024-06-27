import { LoginUserInterFace, UserData } from "@/types/user";
import axiosInstance from "@/utils/interSeptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LoginReducer, LogoutReducer, UpdateUser, deleteUser } from "../reducers/formReducer";

const createUserAction = createAsyncThunk(
  "form/createUser",
  async (body: any, thunkApi) => {
    try {
      axiosInstance
        .post("/user/ragister", body)
        .then((res) => {
          toast.success(res.data.message);
          return res.data;
        })
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // axiosInstance
    //   .post("/user/ragister", body)
    //   .then((res) => {
    //     toast.success(res.data.message);
    //     return res.data;
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
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
        toast.error(err?.response?.data?.message);
      });
  }
);
const LoginUserAction = createAsyncThunk(
  "user/login",
  async (body: LoginUserInterFace, thunkApi) => {
    try {
      const response = await axiosInstance
        .post("/user/login", body);
        if (response.data) {
              thunkApi.dispatch(LoginReducer(response.data.data));
              localStorage.setItem("assignToken", response.data.data.token)
              return response.data;
            }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const LogoutUserAction = createAsyncThunk(
  "user/login",
  async (_, thunkApi) => {
    try {
      localStorage.removeItem("assignToken")
      thunkApi.dispatch(LogoutReducer())
    } catch (error) {
      toast.error("Something went wrong")
    }
  });

export {
  LoginUserAction,
  createUserAction,
  delateUserAction,
  updateUserAction,
  LogoutUserAction,
};
