import { productInterface } from "@/types/InterFace"
import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
    products: [],
    wishlist: []
}

const createProductSlice = createSlice({
    name: "product/create",
    initialState: initialValues,
    reducers: {
        createProductReducer: (state: any, action) => {
            state.products = [...state.products, action.payload]
        },
        getAllProductReducer: (state: any, action) => {
            state.products = action.payload
        },
        deleteProductReducer: (state: any, action) => {
            const filterData = state.products.filter((product: productInterface) => product._id != action.payload)
            state.products = filterData;
        },
        updateProductReducer: (state: any, action) => {
            const filterData = state.products.filter((product: productInterface) => product._id == action.payload.id ? action.payload.data : product)
            state.products = filterData;
        },
        wishlistReducer: (state: any, action) => {
            const haveProduct = state.wishlist.some((product: productInterface) => product._id === action.payload._id);
            if (haveProduct) {
                state.wishlist = state.wishlist.filter((product: productInterface) => product._id !== action.payload._id);
            } else {
                state.wishlist = [action.payload, ...state.wishlist];
            }
        },
    }
})


export const {
    createProductReducer,
    getAllProductReducer,
    deleteProductReducer,
    wishlistReducer
} = createProductSlice.actions
export default createProductSlice.reducer