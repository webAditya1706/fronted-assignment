import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
    userId: string;
    product: {};
    _id: string;
}

interface CartState {
    cart: CartItem[];
}


const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCartReducer: (state: any, action: PayloadAction<CartState>) => {
            let data = action.payload
            state.cart.unshift(action.payload);

        },
        getAllCartReducer: (state, action) => {
            state.cart = action.payload
        },
        removeFromCartReducer: (state, action: PayloadAction<string>) => {
            state.cart = state.cart.filter((cart: CartItem) => cart._id !== action.payload);
        },
        removeAllCartReducer: (state, action) => {
            state.cart = []
        },

    },

});

// Export actions and reducer
export const { addToCartReducer, getAllCartReducer, removeFromCartReducer, removeAllCartReducer } = cartSlice.actions;
export default cartSlice.reducer;
