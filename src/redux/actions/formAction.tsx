import { LoginUserInterFace } from "@/types/InterFace";
import axiosInstance from "@/utils/interSeptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { LoginReducer, LogoutReducer, UpdateUserReducer, deleteUser } from "../reducers/formReducer";


const createUserAction = createAsyncThunk(
  "form/createUser",
  async (body: any, thunkApi) => {
    try { 
      const response = await axiosInstance
        .post("/user/ragister", body)
      if (response) {
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
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
    try {
      const response = await axiosInstance
      .patch("/user/updateUser", body);
      if(response){
        thunkApi.dispatch(UpdateUserReducer(response.data.data));
        return response.data
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.message);
    }
  });

const LoginUserAction = createAsyncThunk(
  "user/login",
  async (body: LoginUserInterFace, thunkApi) => {
    try {
      const response = await axiosInstance
        .post("/user/login", body);
      if (response.data) {
        thunkApi.dispatch(LoginReducer(response.data.data));
        Cookies.set('assignToken', response.data.data.token , { expires: 1/2 })

        localStorage.setItem("assignToken", response.data.data.token)
        return response.data;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

const LogoutUserAction = createAsyncThunk(
  "user/login",
  async (_, thunkApi) => {
    try {
      Cookies.remove('assignToken');
      localStorage.removeItem("assignToken")
      thunkApi.dispatch(LogoutReducer(null))
    } catch (error) {
      toast.error("Something went wrong")
    }
  });

const GetAllUsersAction = createAsyncThunk(
  "user/GetAllUsersAction",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get("/user/getAllUser");
      return response.data.data;
      return response
    } catch (error) {
      toast.error("Something went wrong")
    }
  });

export {
  GetAllUsersAction, LoginUserAction,
  LogoutUserAction,
  createUserAction,
  delateUserAction,
  updateUserAction
};

