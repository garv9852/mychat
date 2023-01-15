import {createSlice} from "@reduxjs/toolkit";
const initialState={
    user:{},
    chatUser:{},
    clients:[]
}

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const {user}=action.payload;
            state.user=user;
        },
        setChatUser:(state,action)=>{
            const {chatUser}=action.payload;
            state.chatUser=chatUser;
        },
        setClient:(state,action)=>{
            const {clients}=action.payload;
            state.clients=clients;
        }
    }
})

export const {setUser,setChatUser,setClient}=authSlice.actions;

export default authSlice.reducer;