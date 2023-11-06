import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    companyName:"",
    email:"",
    role:"",

}

const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        setCompanyDetails:(state,action)=>{
            state.companyName = action.payload.companyName
            state.email = action.payload.email
            state.role = action.payload.role
        },
        logOutDetails2:(state)=>{
            state.companyName = ""
            state.email = ""
            state.role = ""

            
        }
    }
})




export const {setCompanyDetails,logOutDetails2} = companySlice.actions
export default companySlice.reducer
