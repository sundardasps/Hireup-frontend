import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    userName:"",
    email:"",
    role:"",

}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.userName = action.payload.userName
            state.email = action.payload.email
            state.role = action.payload.role
        },
        logOutDetails:(state)=>{
            state.userName = ""
            state.email = ""
            state.role = ""
        }
    }
})


export const {setUserDetails,logOutDetails} = userSlice.actions
export default userSlice.reducer
