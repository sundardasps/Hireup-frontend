import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    companyName:"",
    email:"",
    role:"",
    id:"",
    completed:0 
}

const companySlice = createSlice({
    name:"company",
    initialState,
    reducers:{
        setCompanyDetails:(state,action)=>{
            state.companyName = action.payload.companyName
            state.email = action.payload.email
            state.role = action.payload.role
            state.completed = action.payload.completed
            state.id = action.payload.id

        },
        logOutDetails2:(state)=>{
            state.companyName = ""
            state.email = ""
            state.role = ""
            state.completed = "" 
            state.id=""
        }
    }
})




export const {setCompanyDetails,logOutDetails2} = companySlice.actions
export default companySlice.reducer
