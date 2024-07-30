import { createSlice } from "@reduxjs/toolkit";

const Address = {
    roadaddress: '',
    jibunAddress: '',
    englishAddress: '',
    navermapsx: '',
    navermapsy: '',
}

const initialState = Address

const addressSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.roadaddress = action.payload.roadaddress;
            state.jibunAddress = action.payload.jibunAddress;
            state.englishAddress = action.payload.englishAddress;
            state.navermapsx = action.payload.navermapsx;
            state.navermapsy = action.payload.navermapsy;
        }
    },
});

export default addressSlice;