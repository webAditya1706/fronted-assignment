import axiosInstance from "@/utils/interSeptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createProductReducer, deleteProductReducer, getAllProductReducer, productwishlistReducer, wishlistReducer } from "../reducers/productReducer";
import { productInterface } from "@/types/InterFace";


const createProductAction = createAsyncThunk(
  "product/create",
  async (body: productInterface, thunkApi) => {
    axiosInstance
      .post("/product/createProduct", body)
      .then((res) => {
        toast.success(res.data.message);
        thunkApi.dispatch(createProductReducer(res.data.data));
        return res.data
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
      if (err?.response) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }

    }
  })

const deleteProductAction = createAsyncThunk(
  "product/delete",
  async (id: string, thunkApi) => {
    axiosInstance
      .delete(`/product/deleteProduct/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        thunkApi.dispatch(deleteProductReducer(id))
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  })

const getProducByIdtAction = createAsyncThunk(
  "product/getProducByIdtAction",
  async (id: string, thunkApi) => {
    try {
      const response = await axiosInstance.get(`/product/getProduct/${id}`);
      if (response.data) {
        return response.data.data;
      } else {
        toast.error("Something went wrong");
      }
    } catch (err: any) {
      if (err?.response) {
        toast.error(err?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  })

  const getProductFullDetail = createAsyncThunk(
    "product/getProductFullDetail",
    async (id: string, thunkApi) => {
      try {
        const response = await axiosInstance.get(`/product/getProductfulldetail/${id}`);
        if (response.data) {
          return response.data.data;
        } else {
          toast.error("Something went wrong");
        }
      } catch (err: any) {
        if (err?.response) {
          toast.error(err?.response?.data?.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    })

const updateProductAction = createAsyncThunk(
  "product/updateProductAction",
  async ({ formData, id }: any, thunkApi) => {
    axiosInstance
      .patch(`/product/updateProduct/${id}`, formData)
      .then((res) => {
        thunkApi.dispatch(deleteProductReducer({ id, data: res.data.data }))
        toast.success(res.data.message);
        return res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
)

const wishlistAction = createAsyncThunk(
  "product/productAddonWishlist",
  async (body:productInterface, thunkApi) => {
    thunkApi.dispatch(wishlistReducer(body))
  }
)

export {
  createProductAction,
  getAllProductAction,
  updateProductAction,
  deleteProductAction,
  getProducByIdtAction,
  wishlistAction,
  getProductFullDetail,
}