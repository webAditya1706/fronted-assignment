import axiosInstance from "@/utils/interSeptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createProductReducer, deleteProductReducer, getAllProductReducer } from "../reducers/productReducer";


const createProductAction = createAsyncThunk(
  "product/create",
  async (body: any, thunkApi) => {
    axiosInstance
      .post("/product/createProduct", body)
      .then((res) => {
        toast.success(res.data.message);
        thunkApi.dispatch(createProductReducer(res.data.data))
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
)

const getAllProductAction = createAsyncThunk(
  "product/getAllProductAction",
  async (_, thunkApi) => {
    try {
      const response = await axiosInstance.get("/product/getAllProducts");
      if (response.data) {
        thunkApi.dispatch(getAllProductReducer(response.data.data));
      } else {
        toast.error("Something went wrong");
      }
    } catch (err: any) {
      if(err?.response){
        console.log(err?.response,"=======err?.response");
        
        toast.error(err?.response?.data?.message);        
      }else{
        toast.error("Something went wrong");        
      }
      
    }
  })

const deleteProductAction = createAsyncThunk(
  "product/delete",
  async (id: string, thunkApi) => {
    console.log(id, "=========id");

    axiosInstance
      .delete(`/product/deleteProduct/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        thunkApi.dispatch(deleteProductReducer(id))
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
)

const updateProductAction = createAsyncThunk(
  "product/delete",
  async (id: string, thunkApi) => {
    console.log(id, "=========id");

    axiosInstance
      .delete(`/deleteProduct/${id}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
)

export { createProductAction, getAllProductAction, updateProductAction, deleteProductAction }