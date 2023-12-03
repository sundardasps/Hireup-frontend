import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    userName:"",
    email:"",
    role:"",
    userTitle:"",
    userDp:"",
    number:"",

}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.userName = action.payload.userName
            state.email = action.payload.email
            state.role = action.payload.role
            state.userTitle = action.payload.userTitle
            state.userDp = action.payload.userDp
            state.number = action.payload.number
        },
        logOutDetails:(state)=>{
            state.userName = ""
            state.email = ""
            state.role = ""
            state.userTitle=""
            state.userDp =""
            state.number =""

        }
    }
})


export const {setUserDetails,logOutDetails} = userSlice.actions
export default userSlice.reducer
