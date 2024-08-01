import { createSlice } from "@reduxjs/toolkit";

const Request ={
    size: '',
    cropsinfo:'',
    reservationDate: '',
    requestContent: '',

}


// postReturnRequest ={
//     size: '',
//     cropsinfo:'',
//     reservationDate: '',
//     requestContent: '',
//     orderid: '',
//     requestowner:'',
//     address: '',
//     created: '',

// }


const initialState = Request

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setSize: (state, action) => {
            state.size = action.payload.size;
        },
        setCropsinfo: (state, action) => {
            state.cropsinfo = action.payload.cropsinfo;
        },
        setReservationDate: (state, action) => {
            state.reservationDate = action.payload.reservationDate;
        },
        setrequestContent: (state, action) => {
            state.requestContent = action.payload.requestContent;
        },
    },
});

export default requestSlice;

// state.size = action.payload.size;
// state.cropsinfo = action.payload.cropsinfo;
// state.reservationDate = action.payload.reservationDate;
// state.requestContent = action.payload.requestContent;

