import { requestsRoute } from "../../components/backend";
import requestSlice from "../../state/request";
import store from "../../state/store";





export const postCustomerRequest = async function ( address, requestContent, reservationDate,cropsinfo,size,) {

    await fetch(requestsRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //authorization: "Bearer " + userInfo.access,
        },
        body: JSON.stringify({
            address: address,
            size: size,
            cropsinfo: cropsinfo,
            reservationDate: reservationDate,
            requestContent: requestContent,
            
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.body);
            store.dispatch(requestSlice.actions.setRequest(data));
        });

    //console.log(customerRequests);
    //return customerRequests;
}