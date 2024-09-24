import { createSlice } from "@reduxjs/toolkit";

export const Address = {
    roadaddress: '',
    jibunAddress: '',
    englishAddress: '',
    navermapsx: '',
    navermapsy: '',
}

const initialState = Address

const addressSlice = createSlice({
    name: 'address',
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