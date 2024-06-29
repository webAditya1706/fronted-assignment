import { combineReducers } from "@reduxjs/toolkit";
import FormReducer from "./formReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer"

const rootReducer = combineReducers({
  FormReducer,
  productReducer,
  cartReducer
});

export default rootReducer;
