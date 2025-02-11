import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore=createSlice({
  name:'bill',
  initialState:{
    billList:[]
  },
  reducers:{
    setBillList(state,action){
      state.billList=action.payload
    }
  }
})
const{setBillList}=billStore.actions

const getBillList=()=>{
  return async(dispatch)=>{
    const re=await axios.get('http://localhost:8888/ka')
    dispatch(setBillList(re.data))
  }
}
const addBillList=(data)=>{
  return async(dispatch)=>{
    const re=await axios.post('http://localhost:8888/ka',data)
    dispatch(setBillList(re.data))
  }
}
export{getBillList,addBillList}
const billStoreReducer=billStore.reducer
export default billStoreReducer
