import { configureStore } from "@reduxjs/toolkit";
import billStoreReducer from "./modules/billStore";

const store=configureStore({
  reducer:{
    bill:billStoreReducer
  }
})
export default store