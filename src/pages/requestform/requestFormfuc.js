import { data } from "jquery";
import { requestsRoute } from "../../components/backend";
import store from "../../state/store";
import requestSlice from "../../state/request";



export const postCustomerRequest = async function (request) {

    const userInfo = store.getState().persist.userInfo;
    const address = store.getState().address;

    await fetch(requestsRoute, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + userInfo.access,
        },
        body: JSON.stringify({
            ...request,
            address: address
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data);
            store.dispatch(requestSlice.actions.setRequestData(data));
        })
}

// {
//     request: request,
//         address: address
// }

// {
//     ...request,
//         address: address
// }

// {
//     request: {
//         size: string;
//         cropsinfo: string;
//         reservationDate: string;
//         requestContent: string;
//     }
//     address: {
//         roadaddress: string;
//         jibunAddress: string;
//         englishAddress: string;
//         navermapsx: string;
//         navermapsy: string;
//     }
// }

// {

//     size: string;
//     cropsinfo: string;
//     reservationDate: string;
//     requestContent: string;

//     address: {
//         roadaddress: string;
//         jibunAddress: string;
//         englishAddress: string;
//         navermapsx: string;
//         navermapsy: string;
//     }
// }