import { productInterface } from "@/types/InterFace";
import axiosInstance from "@/utils/interSeptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addToCartReducer, getAllCartReducer, removeAllCartReducer, removeFromCartReducer } from "../reducers/cartReducer";


const addTocartAction = createAsyncThunk(
    "cart/addTocartAction",
    async (body: productInterface, thunkApi) => {
        try {
            const response = await axiosInstance.post("/cart/addToCart", body);
            if (response) {
                toast.success(response.data.message)
                thunkApi.dispatch(addToCartReducer(response.data.data))
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    })

const getAllCartAction = createAsyncThunk(
    "cart/addTocartAction",
    async (_, thunkApi) => {
        try {
            const response = await axiosInstance.get("/cart/getAllCart");
            if (response) {
                thunkApi.dispatch(getAllCartReducer(response.data.data))
                return response.data.data
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    })

const removeFromCartAction = createAsyncThunk(
    "cart/addTocartAction",
    async (id: string, thunkApi) => {
        try {
            const response = await axiosInstance.delete(`/cart/removeFromCart/${id}`);
            if (response) {
                toast.success(response.data.message)
                thunkApi.dispatch(removeFromCartReducer(id))
                return response.data.data
            }
        } catch (error: any) {
            console.log(error.response, "=========error.response");
            toast.error(error.response.data.message);
        }
    })

const placeorderAction = createAsyncThunk(
    "cart/placeorder",
    async (_,thunkApi) => {
        try {
            const response = await axiosInstance.delete("/cart/placeorder");
            if (response) {
                toast.success(response.data.message);
                thunkApi.dispatch(removeAllCartReducer(null))
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
)

export { addTocartAction, getAllCartAction, removeFromCartAction, placeorderAction }