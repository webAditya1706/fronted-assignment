import { combineReducers } from "@reduxjs/toolkit";
import FormReducer from "./formReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  FormReducer,
  productReducer
});

export default rootReducer;
