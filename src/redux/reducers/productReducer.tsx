import { productInterface } from "@/types/InterFace"
import { createSlice } from "@reduxjs/toolkit"

const initialValues = {
    products: []
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
            console.log(action.payload, "============action.payload");
            const filterData = state.products.filter((product: productInterface) => product._id != action.payload)
            console.log(filterData,"=====");
            state.products = filterData;
        }
    }
})


export const { createProductReducer, getAllProductReducer,deleteProductReducer } = createProductSlice.actions
export default createProductSlice.reducer