import { createSlice } from "@reduxjs/toolkit";

// Request ={
//     size: '',
//     amount: '',
//     cropsinfo:'',
//     reservationDate: '',
//     requestContent: '',
//     orderid: '',
//     requestowner:'',
//     created: '',
// }

const initialState = {
};

const requestSlice = createSlice({
    name: 'request',
    initialState: initialState,
    reducers: {
        setRequestData: (state, action) => {
            return action.payload
        },
    },
});

export default requestSlice;

// state.size = action.payload.size;
// state.cropsinfo = action.payload.cropsinfo;
// state.reservationDate = action.payload.reservationDate;
// state.requestContent = action.payload.requestContent;

