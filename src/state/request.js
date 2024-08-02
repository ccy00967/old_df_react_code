import { createSlice } from "@reduxjs/toolkit";
import { Address } from "./address";
import { UserRegistraion } from "./registration";
import { TossPayment } from "./tosspayments";


const Request = {
    orderid: '',
    requestowner: UserRegistraion,
    address: Address,
    size: '',
    amount: '',
    cropsinfo: '',
    reservationDate: '',
    requestContent: '',
    created: '',
    exterminatorinfo: UserRegistraion,
    tosspayments: TossPayment,
}

export const requestSlice = createSlice({
    name: 'request',
    initialState: Request,
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

