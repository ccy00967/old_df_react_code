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

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        setName: (state, action) => {
            state.userName = action.payload;
        },
        setPhonenumber: (state, action) => {
            state.userPhone = action.payload;
        },
        setBirth: (state, action) => {
            state.birth = action.payload;
        },
        setGender: (state, action) => {
            state.userGender = action.payload;
        },
        setNationalinfo: (state, action) => {
            state.userNation = action.payload;
        },
        setNickname: (state, action) => {
            state.userNickname = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        handleOpen: (state) => {
            state.open = true;
        },
        handleClose: (state) => {
            state.open = false;
        },
    },
});

export const { setEmail, setPassword, setName, setUserData, setAddress, handleOpen, handleClose, setBirth, setGender, setNationalinfo, setNickname, setPhonenumber } = registrationSlice.actions;
export default registrationSlice;