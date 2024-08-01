import { createSlice } from "@reduxjs/toolkit";

const Request ={
    size: '',
    cropsinfo:'',
    reservationDate: '',
    requestContent: '',

}


const initialState = Request

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequest: (state, action) => {
            state.size = action.payload.size;
            state.cropsinfo = action.payload.cropsinfo;
            state.reservationDate = action.payload.reservationDate;
            state.requestContent = action.payload.requestContent;


        }
    },
});

export default requestSlice;