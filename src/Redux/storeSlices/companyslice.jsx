import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    companyName:"",
    email:"",
    role:"",
    id:""

}

const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        setCompanyDetails:(state,action)=>{
            state.companyName = action.payload.companyName
            state.email = action.payload.email
            state.role = action.payload.role
            state.id = action.payload.id

        },
        logOutDetails2:(state)=>{
            state.companyName = ""
            state.email = ""
            state.role = ""
            state.id=""
        }
    }
})




export const {setCompanyDetails,logOutDetails2} = companySlice.actions
export default companySlice.reducer
