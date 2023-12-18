import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    userName:"",
    email:"",
    role:"",
    userTitle:"",
    userDp:"",
    number:"",
    userId:""

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
            state.userId = action.payload.userId
        },
        logOutDetails:(state)=>{
            state.userName = ""
            state.email = ""
            state.role = ""
            state.userTitle=""
            state.userDp =""
            state.number =""
            state.userId=""
        }
    }
})


export const {setUserDetails,logOutDetails} = userSlice.actions
export default userSlice.reducer
