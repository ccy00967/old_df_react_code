import { createSlice } from '@reduxjs/toolkit';

const UserRegistraion = {
    userEmail: '',
    name : '',
    phone_number: '',
    birth: '',
    gender: '',
    nationalinfo: '',
    nickname: '',
    password: '',
}

const initialState = UserRegistraion

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setName: (state, action) => {
            state.userName = action.payload;
        },
        handleOpen: (state) => {
            state.open = true;
        },
        handleClose: (state) => {
            state.open = false;
        },
    },
});

export const { setEmail, setPassword, setName, setUserData, setAddress, handleOpen, handleClose } = userSlice.actions;
export default userSlice;